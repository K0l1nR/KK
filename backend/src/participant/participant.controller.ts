import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { LoginParticipantDto, RegisterParticipantDto, UpdateParticipantDto } from './dto';
import { Public } from 'src/common/guards/public.guard';
import { CreateRegistrationDto } from './dto/register-to-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Public()
  @Post('register')
  register(@Body() registerParticipantDto: RegisterParticipantDto) {
    return this.participantService.register(registerParticipantDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginParticipantDto: LoginParticipantDto) {
    return this.participantService.login(loginParticipantDto);
  }

  @Post('sign-to-event')
  registerToEvent(
    @Body() dto: CreateRegistrationDto
  ) {
    return this.participantService.registerParticipantToEvent(dto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.participantService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(id);
  }
}
