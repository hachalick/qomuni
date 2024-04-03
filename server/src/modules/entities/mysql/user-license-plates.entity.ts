import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserLicensePlatesEntity {
  @PrimaryGeneratedColumn('uuid')
  user_license_plates_id: string;

  @ManyToOne((type) => UserEntity, (user) => user.userLicensePlatesEntity, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  license_plate: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  isAccept: boolean;
}
