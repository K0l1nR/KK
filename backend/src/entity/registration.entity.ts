import { Entity, ManyToOne, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ParticipantEntity } from './participant.entity';
import { EventEntity } from './event.entity';


@Entity('registration')
export class RegistrationEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ParticipantEntity, participant => participant.registrations, { onDelete: 'CASCADE' })
  participant: ParticipantEntity;

  @ManyToOne(() => EventEntity, event => event.registrations, { onDelete: 'CASCADE' })
  event: EventEntity;

  @Column()
  registrationDate: Date;
}
