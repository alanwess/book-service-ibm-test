import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
        ...(process.env.NODE_ENV === 'production'
          ? [
              new WinstonCloudWatch({
                logGroupName: 'books-api',
                logStreamName: `books-api-stream-${new Date().toISOString().split('T')[0]}`,
                awsRegion: process.env.AWS_REGION || 'us-east-1',
                jsonMessage: true,
                retentionInDays: 7,
              }),
            ]
          : []),
      ],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('Documentação da api de Livros')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();