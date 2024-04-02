import { NestFactory } from '@nestjs/core';
import { callBackListener } from './modules/utils/callBack.main';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { configSwagger } from 'src/modules/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug'],
    
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get('App.port');
  app.useStaticAssets(join(process.cwd(), '../public'));
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(port, () => callBackListener(port));
}
bootstrap();
