import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { LicensePlatesEntity } from './license-plates.entity';
import { CameraLocationEntity } from './camera-location.entity';

@Entity()
export class CameraEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  url: string;

  @OneToMany((type) => LicensePlatesEntity, (table) => table.camera)
  licensePlatesEntity: LicensePlatesEntity[];

  @OneToOne((type) => CameraLocationEntity, (table) => table.camera)
  cameraLocationEntity: CameraLocationEntity[];
}
