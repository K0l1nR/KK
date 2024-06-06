import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, EventDto, UpdateEventDto } from './dto';
import { EventEntity } from 'src/entity/event.entity';
import { RegistrationEntity } from 'src/entity/registration.entity';
import { ParticipantEntity } from 'src/entity/participant.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(RegistrationEntity)
    private readonly registrationRepository: Repository<RegistrationEntity>,
  ) {}


  getById(id: string): Promise<EventEntity> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async create(dto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventRepository.create(dto)
    this.eventRepository.save(event)
    return event;
  }

  async findAll(page: number, limit: number): Promise<{ data: EventEntity[], count: number }> {
    const [data, count] = await this.eventRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, count };
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventEntity> {
    const item = await this.eventRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    await this.eventRepository.update(id, updateEventDto);
    const updatedItem = await this.eventRepository.findOne({ where: { id } });

    if (!updatedItem) {
      throw new NotFoundException(`Event with id ${id} not found after update`);
    }

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }

  async countParticipants(eventId: string): Promise<number> {
    return await this.registrationRepository.count({ where: { event: { id: eventId } } });
  }

  async getParticipants(eventId: string): Promise<ParticipantEntity[]> {
    const registrations = await this.registrationRepository.find({ where: { event: { id: eventId } }, relations: ['participant'] });
    return registrations.map(registration => registration.participant);
  }
}
