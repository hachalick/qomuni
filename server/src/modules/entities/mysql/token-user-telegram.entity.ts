import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TokenUserTelegramEntity {
  @PrimaryGeneratedColumn('uuid')
  token_user_telegram_id: string;

  @OneToOne(() => UserEntity, (user) => user.tokenUserTelegramEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false, type: 'text' })
  token: string;
}
