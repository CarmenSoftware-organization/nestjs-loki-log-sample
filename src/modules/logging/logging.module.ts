import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LokiLoggerService } from '../../services/loki-logger.service';
import { DefaultLokiConfig } from '../../config/loki.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DefaultLokiConfig,
      useClass: DefaultLokiConfig,
    },
    LokiLoggerService,
  ],
  exports: [LokiLoggerService],
})
export class LoggingModule {}
