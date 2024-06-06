import { ConflictException, HttpCode, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto, LoginParticipantDto, RegisterParticipantDto, UpdateParticipantDto } from './dto';
import { ParticipantEntity } from 'src/entity/participant.entity';
import * as bcrypt from 'bcrypt';
import { RegistrationResult } from './interfaces/registration-result.interface';
import { JwtService } from "@nestjs/jwt";
import { TokenService } from './token.service';
import { AuthResultDto } from './dto/auth-result.dto';
import { CreateRegistrationDto } from './dto/register-to-event.dto';
import { RegistrationEntity } from 'src/entity/registration.entity';
import { EventService } from 'src/events/event.service';
import { RegistrationService } from 'src/registration/registration.service';
import { EventEntity } from 'src/entity/event.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(RegistrationEntity)
    private readonly registrationRepository: Repository<RegistrationEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly eventService: EventService,
    private readonly registrationService: RegistrationService
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  private comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  async register(dto: RegisterParticipantDto): Promise<RegistrationResult> {
    const hashedPassword = await this.hashPassword(dto.password);

    const existingParticipant = await this.participantRepository.findOne({ where: { email: dto.email }})
    
    if (existingParticipant){
      throw new ConflictException('Данная электронная почта уже используется')
    }

    const participant = this.participantRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.participantRepository.save(participant);

    const tokens = this.tokenService.generateBothTokens(participant);
    this.tokenService.createRefreshToken(tokens.refreshToken, participant);

    const result: RegistrationResult = {
      ...tokens,
      participant,
    };

    return result;
  }

  async login(dto: LoginParticipantDto): Promise<AuthResultDto> {
    const participant = await this.participantRepository.findOne({ where: { email: dto.email } });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    const passwordsMatch = await this.comparePasswords(dto.password, participant.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.tokenService.generateBothTokens(participant);

    await this.tokenService.createRefreshToken(tokens.refreshToken, participant);

    const result: AuthResultDto = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenTtl: tokens.accessTokenTtl,
      refreshTokenTtl: tokens.refreshTokenTtl,
    };

    return result;
  }

  getById(id: string): Promise<ParticipantEntity> {
    return this.participantRepository.findOne({ where: { id } });
  }
  
  async findAll(page: number, limit: number): Promise<{ data: ParticipantEntity[], count: number }> {
    const [data, count] = await this.participantRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, count };
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<ParticipantEntity> {
    const item = await this.participantRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    await this.participantRepository.update(id, updateParticipantDto);
    const updatedItem = await this.participantRepository.findOne({ where: { id } });

    if (!updatedItem) {
      throw new NotFoundException(`Participant with id ${id} not found after update`);
    }

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    await this.participantRepository.delete(id);
  }


  async registerParticipantToEvent(createRegistrationDto: CreateRegistrationDto): Promise<RegistrationEntity> {
    const { participantId, eventId } = createRegistrationDto;

    const participant = await this.participantRepository.findOne({ where: { id: participantId } });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const registration = this.registrationRepository.create({
      participant : {id : participant.id},
      event,
      registrationDate: new Date()
    });

    return await this.registrationRepository.save(registration);
  }
}
