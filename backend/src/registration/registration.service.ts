import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDto, RegistrationDto, UpdateRegistrationDto } from './dto';
import { RegistrationEntity } from 'src/entity/registration.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly RegistrationRepository: Repository<RegistrationEntity>,
  ) {}


  getById(id: string): Promise<RegistrationEntity> {
    return this.RegistrationRepository.findOne({ where: { id } });
  }

  async create(dto: CreateRegistrationDto): Promise<RegistrationEntity> {
    const Registration = this.RegistrationRepository.create(dto)
    this.RegistrationRepository.save(Registration)
    return Registration;
  }

  async findAll(page: number, limit: number): Promise<{ data: RegistrationEntity[], count: number }> {
    const [data, count] = await this.RegistrationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, count };
  }

  async update(id: string, updateRegistrationDto: UpdateRegistrationDto): Promise<RegistrationEntity> {
    const item = await this.RegistrationRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Registration with id ${id} not found`);
    }

    await this.RegistrationRepository.update(id, updateRegistrationDto);
    const updatedItem = await this.RegistrationRepository.findOne({ where: { id } });

    if (!updatedItem) {
      throw new NotFoundException(`Registration with id ${id} not found after update`);
    }

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    await this.RegistrationRepository.delete(id);
  }
}
