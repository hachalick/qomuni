import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CameraEntity } from './camera.entity';

@Entity()
export class LicensePlatesEntity {
  @PrimaryGeneratedColumn('uuid')
  license_plate_id: string;

  @ManyToOne((type) => CameraEntity, (camera) => camera.licensePlatesEntity, {
    onDelete: 'CASCADE',
  })
  camera: CameraEntity;

  @Column({ type: 'varchar', length: 20, nullable: false })
  license_plate: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  seen: Date;
}
