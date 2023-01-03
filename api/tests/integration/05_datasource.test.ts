import { connectionHook, sleep } from './jest.util';
import { DataSourceService } from '~/services/datasource.service';
import DataSource from '~/models/datasource';
import { dashboardDataSource } from '~/data_sources/dashboard';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ApiError, BAD_REQUEST } from '~/utils/errors';
import { notFoundId, pgSourceConfig } from './constants';
import { maybeDecryptPassword } from '~/utils/encryption';

describe('DataSourceService', () => {
  connectionHook();
  let datasourceService: DataSourceService;
  let dataSources: DataSource[];
  let pgDatasource: DataSource;
  let httpDatasource: DataSource;

  beforeAll(async () => {
    datasourceService = new DataSourceService();
    dataSources = await dashboardDataSource.manager.find(DataSource, { order: { type: 'ASC', key: 'ASC' } });
  });

  describe('create', () => {
    it('should create successfully', async () => {
      pgDatasource = await datasourceService.create('postgresql', 'pg_2', pgSourceConfig);
      expect(pgDatasource).toMatchObject({
        type: 'postgresql',
        key: 'pg_2',
        config: pgSourceConfig,
        id: pgDatasource.id,
        create_time: pgDatasource.create_time,
        update_time: pgDatasource.update_time,
        is_preset: false,
      });

      httpDatasource = await datasourceService.create('http', 'jsonplaceholder_2', {
        host: 'http://jsonplaceholder.typicode.com',
      });
      expect(httpDatasource).toMatchObject({
        type: 'http',
        key: 'jsonplaceholder_2',
        config: dataSources[0].config,
        id: httpDatasource.id,
        create_time: httpDatasource.create_time,
        update_time: httpDatasource.update_time,
        is_preset: false,
      });
    });

    it('should fail if duplicate', async () => {
      await expect(datasourceService.create('postgresql', 'pg_2', pgSourceConfig)).rejects.toThrowError(
        QueryFailedError,
      );
      await expect(datasourceService.create('http', 'jsonplaceholder_2', pgSourceConfig)).rejects.toThrowError(
        QueryFailedError,
      );
    });

    it('should fail if config incorrect', async () => {
      await expect(
        datasourceService.create('postgresql', 'pg_2', { ...pgSourceConfig, port: 22 }),
      ).rejects.toThrowError(new ApiError(BAD_REQUEST, { message: 'Testing datasource connection failed' }));
    });
  });

  describe('list', () => {
    it('no filters', async () => {
      const datasources = await datasourceService.list(
        undefined,
        { field: 'create_time', order: 'ASC' },
        { page: 1, pagesize: 20 },
      );
      expect(datasources).toMatchObject({
        total: 4,
        offset: 0,
        data: [
          {
            id: dataSources[1].id,
            type: dataSources[1].type,
            key: dataSources[1].key,
            is_preset: dataSources[1].is_preset,
          },
          {
            id: dataSources[0].id,
            type: dataSources[0].type,
            key: dataSources[0].key,
            is_preset: dataSources[0].is_preset,
          },
          {
            id: pgDatasource.id,
            type: pgDatasource.type,
            key: pgDatasource.key,
            is_preset: pgDatasource.is_preset,
          },
          {
            id: httpDatasource.id,
            type: httpDatasource.type,
            key: httpDatasource.key,
            is_preset: httpDatasource.is_preset,
          },
        ],
      });
    });

    it('with search filter', async () => {
      const datasources = await datasourceService.list(
        { search: 'pg_2' },
        { field: 'create_time', order: 'ASC' },
        { page: 1, pagesize: 20 },
      );
      expect(datasources).toMatchObject({
        total: 1,
        offset: 0,
        data: [
          {
            id: pgDatasource.id,
            type: pgDatasource.type,
            key: pgDatasource.key,
            is_preset: pgDatasource.is_preset,
          },
        ],
      });
    });
  });

  describe('getByTypeKey', () => {
    it('should return successfully', async () => {
      const pg = await DataSourceService.getByTypeKey(dataSources[1].type, dataSources[1].key);
      maybeDecryptPassword(dataSources[1]);
      expect(pg).toMatchObject(dataSources[1]);

      const http = await DataSourceService.getByTypeKey(httpDatasource.type, httpDatasource.key);
      expect(http).toMatchObject(httpDatasource);
    });

    it('should fail if not found', async () => {
      await expect(DataSourceService.getByTypeKey('xxx', 'xxx')).rejects.toThrowError(EntityNotFoundError);
    });
  });

  describe('rename', () => {
    it('should fail if new key is same as old key', async () => {
      await expect(datasourceService.rename(pgDatasource.id, pgDatasource.key)).rejects.toThrowError(
        new ApiError(BAD_REQUEST, { message: 'New key is the same as the old one' }),
      );
    });

    it('should fail if entity not found', async () => {
      await expect(datasourceService.rename(notFoundId, '')).rejects.toThrowError(EntityNotFoundError);
    });

    it('should rename successfully', async () => {
      const newPGKey = pgDatasource.key + '_renamed';
      const pgResult = await datasourceService.rename(pgDatasource.id, newPGKey);
      expect(pgResult).toMatchObject({
        type: 'RENAME_DATASOURCE',
        status: 'INIT',
        params: { type: pgDatasource.type, old_key: pgDatasource.key, new_key: newPGKey },
        id: pgResult.id,
        create_time: pgResult.create_time,
        update_time: pgResult.update_time,
      });

      const newHTTPKey = httpDatasource.key + '_renamed';
      const httpResult = await datasourceService.rename(httpDatasource.id, newHTTPKey);
      expect(httpResult).toMatchObject({
        type: 'RENAME_DATASOURCE',
        status: 'INIT',
        params: { type: httpDatasource.type, old_key: httpDatasource.key, new_key: newHTTPKey },
        id: httpResult.id,
        create_time: httpResult.create_time,
        update_time: httpResult.update_time,
      });

      await sleep(3000);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      await datasourceService.delete(pgDatasource.id);
      await datasourceService.delete(httpDatasource.id);
      const datasources = await datasourceService.list(
        undefined,
        { field: 'create_time', order: 'ASC' },
        { page: 1, pagesize: 20 },
      );
      expect(datasources).toMatchObject({
        total: 2,
        offset: 0,
        data: [
          {
            id: dataSources[1].id,
            type: dataSources[1].type,
            key: dataSources[1].key,
            is_preset: dataSources[1].is_preset,
          },
          {
            id: dataSources[0].id,
            type: dataSources[0].type,
            key: dataSources[0].key,
            is_preset: dataSources[0].is_preset,
          },
        ],
      });
    });

    it('should fail if not found', async () => {
      await expect(datasourceService.delete(pgDatasource.id)).rejects.toThrowError(EntityNotFoundError);
      await expect(datasourceService.delete(httpDatasource.id)).rejects.toThrowError(EntityNotFoundError);
    });

    it('should fail if is preset datasource', async () => {
      await expect(datasourceService.delete(dataSources[0].id)).rejects.toThrowError(
        new ApiError(BAD_REQUEST, { message: 'Can not delete preset datasources' }),
      );
    });
  });
});
