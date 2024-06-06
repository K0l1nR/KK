import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ParticipantEntity } from 'src/entity/participant.entity';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.eventService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Get(':id/participant/count')
  async countParticipants(@Param('id', ParseUUIDPipe) eventId: string): Promise<number> {
    return this.eventService.countParticipants(eventId);
  }

  @Get(':id/participant')
  async getParticipants(@Param('id', ParseUUIDPipe) eventId: string): Promise<ParticipantEntity[]> {
    return this.eventService.getParticipants(eventId);
  }
}
