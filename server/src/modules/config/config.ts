import { registerAs } from '@nestjs/config';

export enum ConfigKeys {
  App = 'App',
  Db = 'Db',
  Tel = 'Tel',
  Bu = 'Bu',
}

const BaseConfig = registerAs(ConfigKeys.Bu, () => ({
  mobile: 'YOUR MOBILE',
  password: 'PASSWORD',
}));

const AppConfig = registerAs(ConfigKeys.App, () => ({
  port: 8080,
  token_sms: '',
  token_hash_password: '',
  token_access_token: '',
  token_refresh_token: '',
  token_hash_telegram: '',
  token_time_access_token: '',
  token_time_refresh_token: '',
}));

const TelegramConfig = registerAs(ConfigKeys.Tel, () => ({
  token: '',
}));

const DbMySqlConfig = registerAs(ConfigKeys.Db, () => ({
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: 'qomuni',
}));

export const configurations = [
  AppConfig,
  DbMySqlConfig,
  TelegramConfig,
  BaseConfig,
];
