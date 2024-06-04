import { AuthResponse } from './auth-response.interface';
import { ParticipantEntity } from 'src/entity/participant.entity';

export type RegistrationResult = AuthResponse & { participant: ParticipantEntity };
