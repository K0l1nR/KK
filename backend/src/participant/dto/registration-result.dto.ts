import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { AuthResultDto } from './auth-result.dto';
import { ParticipantDto } from '.';

@Exclude()
export class RegistrationResultDto extends AuthResultDto {
  @ApiProperty()
  @Expose()
  @Type(() => ParticipantDto)
  user: ParticipantDto;
}
