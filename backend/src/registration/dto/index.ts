import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { ICreateRegistration, IRegistration } from '../../../../common/interfaces/registration';

export class RegistrationDto implements IRegistration {
  @ApiProperty({ description: 'Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Event Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  eventId: string;

  @ApiProperty({ description: 'Participant Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  participantId: string;

  @ApiProperty({ description: 'Date', example: new Date() })
  registrationDate: Date;
}

export class CreateRegistrationDto implements ICreateRegistration {
  @ApiProperty({ description: 'Event Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  eventId: string;

  @ApiProperty({ description: 'Participant Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  participantId: string;

  @ApiProperty({ description: 'Date', example: new Date() })
  registrationDate: Date;
}

export class UpdateRegistrationDto extends RegistrationDto {}
