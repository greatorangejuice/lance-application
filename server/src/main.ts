import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InnerDataValidationPipe } from './utils/pipes/innerDataValidation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3005;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new InnerDataValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
