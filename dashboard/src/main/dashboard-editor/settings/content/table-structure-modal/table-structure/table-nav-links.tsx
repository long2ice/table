import { Box, NavLink, Skeleton, Stack } from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { observer } from 'mobx-react-lite';
import { DataSourceModelInstance } from '~/model/datasources/datasource';
import { LoadingSkeleton } from './loading-skeleton';

export const TableNavLinks = observer(({ dataSource }: { dataSource: DataSourceModelInstance }) => {
  const { tables, columns } = dataSource;

  if (tables.loading) {
    return <LoadingSkeleton height={'24px'} lastWidth="50%" count={15} />;
  }
  return (
    <Box h="100%" sx={{ overflow: 'auto', '.mantine-NavLink-label': { fontFamily: 'monospace' } }}>
      {Object.entries(tables.data).map(([table_schema, table_infos]) => (
        <NavLink
          key={table_schema}
          label={table_schema}
          icon={<IconDatabase size={14} />}
          defaultOpened={columns.table_schema === table_schema}
          pl={0}
          childrenOffset={14}
        >
          {table_infos.map((info) => (
            <NavLink
              key={info.table_name}
              label={info.table_name}
              onClick={() => columns.setKeywords(table_schema, info.table_name)}
              active={columns.table_name === info.table_name}
            />
          ))}
        </NavLink>
      ))}
    </Box>
  );
});
