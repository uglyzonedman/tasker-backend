import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api-v2');
  const allowedOrigins = [
    'http://localhost:3000',
    'http://194.169.160.152',
    "http://194.169.160.152:3005",
    'exp://192.168.1.109:8081',
    'http://localhost:4200/',
    'http://localhost:4200',
  ];
  app.enableCors({ credentials: true, origin: allowedOrigins });
  await app.listen(7776);
}
bootstrap();
