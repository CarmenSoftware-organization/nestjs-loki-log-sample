import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { DefaultLokiConfig } from '../config/loki.config';

@Injectable()
export class LokiLoggerService implements LoggerService {
  private logger: winston.Logger;
  private lokiTransport: LokiTransport;

  constructor(
    private readonly config: DefaultLokiConfig = new DefaultLokiConfig(),
  ) {
    this.initializeLogger();
  }

  private initializeLogger(): void {
    // สร้าง Loki transport
    this.lokiTransport = new LokiTransport({
      host: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
      json: this.config.json,
      format: winston.format.json(),
      replaceTimestamp: this.config.replaceTimestamp,
      onConnectionError: this.config.onConnectionError,
      labels: this.config.labels,
      ...(this.config.username && this.config.password && {
        auth: {
          username: this.config.username,
          password: this.config.password,
        },
      }),
    });

    // สร้าง Winston logger
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'nest-loki-logger' },
      transports: [
        // Console transport สำหรับ development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // Loki transport
        this.lokiTransport,
      ],
    });
  }

  log(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, { context, ...meta });
  }

  error(message: string, trace?: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, { trace, context, ...meta });
  }

  warn(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, { context, ...meta });
  }

  debug(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, { context, ...meta });
  }

  verbose(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.verbose(message, { context, ...meta });
  }

  // Custom method สำหรับ structured logging
  logWithLabels(
    message: string,
    labels: Record<string, unknown>,
    context?: string,
  ): void {
    this.logger.info(message, {
      context,
      labels: { ...this.config.labels, ...labels },
      timestamp: new Date().toISOString(),
    });
  }

  // Method สำหรับ performance logging
  logPerformance(
    operation: string,
    duration: number,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.info(`Performance: ${operation}`, {
      context,
      operation,
      duration,
      unit: 'ms',
      ...meta,
    });
  }

  // Method สำหรับ business event logging
  logBusinessEvent(event: string, data: Record<string, unknown>, context?: string): void {
    this.logger.info(`Business Event: ${event}`, {
      context,
      event,
      data,
      timestamp: new Date().toISOString(),
    });
  }
}
