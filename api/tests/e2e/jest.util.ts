import { Authentication } from "~/api_models/base";
import { dashboardDataSource } from "~/data_sources/dashboard";
import ApiKey from "~/models/apiKey";
import { cryptSign } from "~/utils/helpers";

export function connectionHook(): void {
  beforeAll(async () => {
    await dashboardDataSource.initialize();
  });
  afterAll(async () => {
    await dashboardDataSource.destroy();
  });
}

export function createAuthStruct(key: ApiKey, rest: any): Authentication {
  return {
    app_id: key.app_id,
    nonce_str: 'preset',
    sign: cryptSign({ app_id: key.app_id, nonce_str: 'preset', ...rest }, key.app_secret)
  };
}