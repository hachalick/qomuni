import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ERoleUser } from 'src/modules/common/enum/role.enum';
import { RoleEntity } from 'src/modules/entities/mysql/role.entity';
import { TokenUserTelegramEntity } from 'src/modules/entities/mysql/token-user-telegram.entity';
import { UserRoleEntity } from 'src/modules/entities/mysql/user-role.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { hashPassword, hashTokenTel } from 'src/modules/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class ProgrammingService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(TokenUserTelegramEntity)
    private readonly tokenUserTelegramEntityRepository: Repository<TokenUserTelegramEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleEntityRepository: Repository<UserRoleEntity>,
  ) {}

  async initializationTable() {
    const mobile = this.configService.get('Bu.mobile');
    const password = this.configService.get('Bu.password');

    const hashPass = hashPassword(
      password,
      this.configService.get('App.token_hash_password'),
    );
    const tokenTelegram = hashTokenTel(
      mobile,
      this.configService.get('App.token_hash_telegram'),
    );

    const exiRoleAdmin = await this.roleRepository.findOne({
      where: { role: ERoleUser.ADMIN },
    });
    if (!exiRoleAdmin) {
      const roleAdmin = this.roleRepository.create({ role: ERoleUser.ADMIN });
      await this.roleRepository.save(roleAdmin);
    }

    const exiRoleUser = await this.roleRepository.findOne({
      where: { role: ERoleUser.USER },
    });
    if (!exiRoleUser) {
      const roleUser = this.roleRepository.create({ role: ERoleUser.USER });
      await this.roleRepository.save(roleUser);
    }

    const exiUser = await this.userEntityRepository.findOneBy({ mobile });
    if (!exiUser) {
      const roleAdmin = await this.roleRepository.findOneBy({
        role: ERoleUser.ADMIN,
      });
      const user = this.userEntityRepository.create({
        mobile,
        password: hashPass,
      });
      const userSaved = await this.userEntityRepository.save(user);
      const userTelegram = this.tokenUserTelegramEntityRepository.create({
        token: tokenTelegram,
        user: userSaved,
      });
      await this.tokenUserTelegramEntityRepository.save(userTelegram);
      const userRole = this.userRoleEntityRepository.create({
        role: roleAdmin,
        user: userSaved,
      });
      await this.userRoleEntityRepository.save(userRole);
      return { message: 'rows of table created' };
    }
  }
}
