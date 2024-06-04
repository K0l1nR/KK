import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto, UpdateRegistrationDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly RegistrationService: RegistrationService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.RegistrationService.create(createRegistrationDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.RegistrationService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RegistrationService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.RegistrationService.update(id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RegistrationService.remove(id);
  }
}
