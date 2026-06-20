import {
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private readonly logger =
    new Logger('Application');

  log(message: string): void {
    this.logger.log(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(
    message: string,
    trace?: string,
  ): void {
    this.logger.error(
      message,
      trace,
    );
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  verbose(message: string): void {
    this.logger.verbose(message);
  }
}