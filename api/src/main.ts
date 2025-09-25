import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  await seedService.run();
  // toDo: make cors less permissive
  app.enableCors();
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
