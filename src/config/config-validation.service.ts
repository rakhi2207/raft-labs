import { Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export abstract class ConfigValidationService {
  private readonly logger = new Logger();
  private readonly configService = new ConfigService();
  constructor(
    private configKeys: string[],
    private serviceName: string,
  ) {
    this.configKeys = configKeys;
    this.serviceName = this.serviceName.toUpperCase();
  }

  validateConfigKeys() {
    this.logger.log(
      `Checking env variables required for service: ${this.serviceName}`,
    );
    let missingValues = false;
    for (const key of this.configKeys) {
      if (!this.configService.get(key)) {
        const errorMessage = `Missing env variable: ${key} which is required in service: ${this.serviceName}. Please add this variable before restarting app`;
        this.logger.error(errorMessage);
        missingValues = true;
        throw new NotFoundException(errorMessage);
      }
    }

    if (!missingValues) {
      this.logger.log(
        `All env variables are present for service: ${this.serviceName}`,
      );
    }
  }

  logMessage(messg: string) {
    this.logger.log(messg);
  }
}
