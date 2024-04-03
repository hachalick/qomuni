import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmDbConfig } from './modules/config/typeorm.config';
import { ConfigsModule } from 'src/modules/config/configuration.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './modules/common/middleware/logger.middleware';
import { GuardModule } from './guard/guard.module';
import { ProgrammingModule } from './programming/programming.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [ConfigsModule],
    }),
    ConfigsModule,
    AdminModule,
    UserModule,
    AuthModule,
    GuardModule,
    ProgrammingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}