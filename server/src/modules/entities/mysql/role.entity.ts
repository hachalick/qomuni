import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  role_id: string;

  @OneToMany(() => UserEntity, (user) => user.userRole)
  user_role: UserEntity;

  @Column({ type: 'varchar', length: 120 })
  role: string;
}
