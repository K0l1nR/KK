import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAppSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupAppSwagger(app);
  await app.listen(3000);
}
bootstrap();