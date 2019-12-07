import * as loadedConfig from "!val-loader!./config-loader";

export interface IConfig {
    server_name: string;
}

export const config = loadedConfig as IConfig;
