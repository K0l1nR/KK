import { Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RegistrationEntity } from './registration.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity('participant')
export class ParticipantEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.participant)
  refreshTokens: RefreshToken[];
  
  @OneToMany(() => RegistrationEntity, (registration: RegistrationEntity) => registration.participant)
  registrations: RegistrationEntity[];
}
