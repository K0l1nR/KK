import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { ICreateEvent, IEvent } from '../../../../common/interfaces/event';

export class EventDto implements IEvent {
  @ApiProperty({ description: 'Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name', example: 'Название мероприятия' })
  name: string;

  @ApiProperty({ description: 'Description', example: 'Описание мероприятия' })
  description: string;

  @ApiProperty({ description: 'Date', example: new Date() })
  date: Date;

  @ApiProperty({ description: 'Location', example: 'г.Москва, Красная Площадь' })
  location: string;
}

export class CreateEventDto implements ICreateEvent {
  @ApiProperty({ description: 'Id', example: '1eeca432-851f-65c0-a058-ddc3daaa3b14' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name', example: 'Название мероприятия' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description', example: 'Описание мероприятия' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date', example: new Date() })
  date: Date;

  @ApiProperty({ description: 'Location', example: 'г.Москва, Красная Площадь' })
  @IsString()
  location: string;
}

export class UpdateEventDto extends EventDto {}
