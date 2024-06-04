import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { ICreateParticipant, IParticipant } from '../../../../common/interfaces/participant';
import { Transform } from "class-transformer";

export class ParticipantDto implements IParticipant {
  @ApiProperty({ description: 'Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name', example: 'Имя пользователя' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email', example: 'Электронная почта' })
  @IsString()
  @Transform(({ obj }) => obj.email.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Password', example: '123123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Phone', example: '+996123456789' })
  @IsString()
  phone: string;
}

export class RegisterParticipantDto implements ICreateParticipant {
  @ApiProperty({ description: 'Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name', example: 'Имя пользователя' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email', example: 'Электронная почта' })
  @IsString()
  @Transform(({ obj }) => obj.email.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Password', example: '123123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Phone', example: '+996123456789' })
  @IsString()
  phone: string;
}

export class LoginParticipantDto {
  @ApiProperty({ description: 'Email', example: 'Электронная почта' })
  @IsString()
  @Transform(({ obj }) => obj.email.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Password', example: '123123' })
  password: string;
}

export class UpdateParticipantDto extends ParticipantDto {}

export class CreateParticipantDto extends ParticipantDto {}
