import { Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RegistrationEntity } from './registration.entity';

@Entity('event')
export class EventEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'date' })
  date: Date;

  @Column({ nullable: false, name: 'location' })
  location: string;

  @OneToMany(() => RegistrationEntity, (registration: RegistrationEntity) => registration.event)
  registrations: RegistrationEntity[];
}
