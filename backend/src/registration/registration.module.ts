import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationEntity } from 'src/entity/registration.entity';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
