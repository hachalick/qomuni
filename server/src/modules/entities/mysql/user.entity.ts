import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserLicensePlatesEntity } from './user-license-plates.entity';
import { TokenUserTelegramEntity } from './token-user-telegram.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  mobile: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToOne(
    () => TokenUserTelegramEntity,
    (table) => table.token_user_telegram_id,
    { cascade: true },
  )
  tokenUserTelegramEntity: TokenUserTelegramEntity[];

  @OneToMany((type) => UserLicensePlatesEntity, (table) => table.user, {
    cascade: true,
  })
  userLicensePlatesEntity: UserLicensePlatesEntity[];

  @OneToOne(() => UserRoleEntity, (userRole) => userRole.user, {
    cascade: true,
  })
  userRole: UserRoleEntity;
}
