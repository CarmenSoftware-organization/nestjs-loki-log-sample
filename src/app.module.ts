import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggingModule } from "./modules/logging/logging.module";
import { ExampleController } from "./controllers/example.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    LoggingModule,
  ],
  controllers: [AppController, ExampleController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
