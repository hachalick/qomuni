import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity()
export class UserRoleEntity {
  @PrimaryGeneratedColumn('uuid')
  user_role_id: string;

  @OneToOne(() => UserEntity, (user) => user.userRole)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.user_role)
  role: RoleEntity;
}
