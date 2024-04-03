import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class OtpEntity {
  @PrimaryColumn({ type: 'varchar', length: 10, nullable: false, unique: true })
  mobile: string;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: false })
  otp_code: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expires_in: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  isUsed: boolean;
}
