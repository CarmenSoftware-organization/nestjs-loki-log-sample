import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("NestJS Loki Logger API")
    .setDescription("API สำหรับการทดสอบ NestJS พร้อมกับ Loki logging system")
    .setVersion("1.0")
    .addTag("example", "ตัวอย่าง endpoints สำหรับการทดสอบ")
    .addTag("logging", "endpoints สำหรับการทดสอบ logging")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "NestJS Loki Logger - API Documentation",
    customCss: ".swagger-ui .topbar { display: none }",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
  });

  // CORS configuration
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation available at: http://localhost:${port}/api`);
}

bootstrap();
