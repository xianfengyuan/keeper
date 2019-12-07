import { config } from "./config/config";

export class ConfigService {
  private cfg = config;

  getConfig() {
    return this.cfg;
  }
}
