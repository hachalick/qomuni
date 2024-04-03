import { Module } from '@nestjs/common';
import { ProgrammingController } from './programming.controller';
import { ProgrammingService } from './programming.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/entities/mysql/role.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { TokenUserTelegramEntity } from 'src/modules/entities/mysql/token-user-telegram.entity';
import { UserRoleEntity } from 'src/modules/entities/mysql/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserEntity, TokenUserTelegramEntity, UserRoleEntity]),
  ],
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
})
export class ProgrammingModule {}
