import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InnerDataValidationPipe } from './utils/pipes/innerDataValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new InnerDataValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(3005);
}
bootstrap();
