import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, BaseEntity, PrimaryColumn } from 'typeorm';
import { ParticipantEntity } from './participant.entity';
import { dayjs } from 'src/dayjs';


@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @ManyToOne(() => ParticipantEntity, participantEntity => participantEntity.refreshTokens, { onDelete: 'CASCADE' })
  participant: ParticipantEntity;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  set expiration(s: number) {
    this.expiresAt = dayjs().utc().add(s, 'seconds').toDate();
  }
}
