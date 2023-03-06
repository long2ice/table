import { dashboardDataSource } from '../data_sources/dashboard';
import { Account } from '../api_models/account';
import ApiKey from '../models/apiKey';
import Config from '../models/config';
import { ApiError, BAD_REQUEST } from '../utils/errors';
import { FindOptionsWhere } from 'typeorm';
import { DEFAULT_LANGUAGE } from '../utils/constants';
import i18n, { translate } from '../utils/i18n';
import { ROLE_TYPES } from '../api_models/role';

export enum ConfigResourceTypes {
  GLOBAL = 'GLOBAL',
  ACCOUNT = 'ACCOUNT',
  APIKEY = 'APIKEY',
}

type KeyConfig = {
  [key: string]: KeyConfigProperties;
};
type KeyConfigProperties = {
  auth: Auth;
  isGlobal: boolean;
  acceptedValues?: string[];
  default?: string;
};
type Auth = {
  get: AuthConfig;
  update: AuthConfig;
};
type AuthConfig = {
  min?: ROLE_TYPES;
};

export class ConfigService {
  static keyConfig: KeyConfig = {
    lang: {
      auth: {
        get: {},
        update: {
          min: ROLE_TYPES.INACTIVE,
        },
      },
      isGlobal: false,
      acceptedValues: i18n.getLocales(),
      default: DEFAULT_LANGUAGE,
    },
    website_settings: {
      auth: {
        get: {},
        update: {
          min: ROLE_TYPES.ADMIN,
        },
      },
      isGlobal: true,
      default: JSON.stringify({
        WEBSITE_LOGO_URL_ZH: process.env.WEBSITE_LOGO_URL_ZH,
        WEBSITE_LOGO_URL_EN: process.env.WEBSITE_LOGO_URL_EN,
        WEBSITE_LOGO_JUMP_URL: process.env.WEBSITE_LOGO_JUMP_URL,
        WEBSITE_FAVICON_URL: process.env.WEBSITE_FAVICON_URL,
      }),
    },
  };

  static async delete(key: string, resource_type: ConfigResourceTypes, resource_id: string): Promise<void> {
    const configRepo = dashboardDataSource.getRepository(Config);
    await configRepo.delete({ key, resource_id, resource_type });
  }

  async get(
    key: string,
    auth: Account | ApiKey | undefined,
    locale: string = DEFAULT_LANGUAGE,
  ): Promise<{ key: string; value: string | undefined }> {
    const keyConfig = ConfigService.keyConfig[key];
    const result = { key, value: keyConfig.default };
    const where: FindOptionsWhere<Config> = { key, resource_type: ConfigResourceTypes.GLOBAL };

    if (keyConfig.auth.get.min && (!auth || auth.role_id < keyConfig.auth.get.min)) {
      throw new ApiError(BAD_REQUEST, { message: translate('CONFIG_INSUFFICIENT_PRIVILEGES', locale) });
    }

    if (!keyConfig.isGlobal) {
      if (!auth) {
        return result;
      }
      where.resource_type = auth instanceof ApiKey ? ConfigResourceTypes.APIKEY : ConfigResourceTypes.ACCOUNT;
      where.resource_id = auth.id;
    }

    const configRepo = dashboardDataSource.getRepository(Config);
    const config = await configRepo.findOneBy(where);
    if (config) {
      result.value = config.value;
    }
    return result;
  }

  async update(
    key: string,
    value: string,
    auth: Account | ApiKey | undefined,
    locale: string,
  ): Promise<{ key: string; value: string }> {
    const where: FindOptionsWhere<Config> = { key, resource_type: ConfigResourceTypes.GLOBAL };
    const keyConfig = ConfigService.keyConfig[key];

    if (keyConfig.auth.update.min || !keyConfig.isGlobal) {
      if (!auth) {
        throw new ApiError(BAD_REQUEST, { message: translate('CONFIG_REQUIRES_AUTHENTICATION', locale) });
      }
      if (keyConfig.auth.update.min && auth.role_id < keyConfig.auth.update.min) {
        throw new ApiError(BAD_REQUEST, { message: translate('CONFIG_INSUFFICIENT_PRIVILEGES', locale) });
      }
      if (!keyConfig.isGlobal) {
        where.resource_type = auth instanceof ApiKey ? ConfigResourceTypes.APIKEY : ConfigResourceTypes.ACCOUNT;
        where.resource_id = auth.id;
      }
    }

    this.validateKey(keyConfig, value, locale);

    const configRepo = dashboardDataSource.getRepository(Config);
    let config = await configRepo.findOneBy(where);
    if (!config) {
      config = new Config();
      config.key = key;
      config.resource_type = ConfigResourceTypes.GLOBAL;
      if (!keyConfig.isGlobal) {
        config.resource_type = auth instanceof ApiKey ? ConfigResourceTypes.APIKEY : ConfigResourceTypes.ACCOUNT;
        config.resource_id = auth!.id;
      }
    }
    config.value = value;
    const result = await configRepo.save(config);
    return { key, value: result.value };
  }

  private validateKey(keyConfig: KeyConfigProperties, value: string, locale: string) {
    if (keyConfig.acceptedValues && !keyConfig.acceptedValues.includes(value))
      throw new ApiError(BAD_REQUEST, {
        message: translate('CONFIG_INCORRECT_VALUE', locale),
        acceptedValues: keyConfig.acceptedValues,
      });
  }
}
