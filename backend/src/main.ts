import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Swagger
  const options = new DocumentBuilder()
    .setTitle('Sales API')
    .setDescription('API for managing sales')
    .setVersion('1.0')
    .addTag('Sales')
    .addBearerAuth()  // Add Bearer Auth to Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI will be available at /api-docs
  
  // Enable CORS
  app.enableCors({
    origin: (origin, callback) => {
      const blockedOrigins = ['http://blocked-domain.com', 'http://malicious-site.com']; // List of disallowed origins
  
      if (!origin || !blockedOrigins.includes(origin)) {
        callback(null, true); // Allow all origins except those in blockedOrigins
      } else {
        callback(new Error('Not allowed by CORS')); // Block specific origins
      }
    },
    credentials: true,
  });
  

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
