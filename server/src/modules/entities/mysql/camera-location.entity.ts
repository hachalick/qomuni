import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CameraEntity } from './camera.entity';

@Entity()
export class CameraLocationEntity {
  @PrimaryGeneratedColumn('uuid')
  camera_location_id: string;

  @OneToOne((type) => CameraEntity, (camera) => camera.cameraLocationEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  camera: CameraEntity;

  @Column({ type: 'float', nullable: false })
  lat: number;

  @Column({ type: 'float', nullable: false })
  long: number;
}
