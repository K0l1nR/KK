import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/entity/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { RegistrationEntity } from 'src/entity/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, RegistrationEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
