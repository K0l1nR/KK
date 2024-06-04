import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantEntity } from 'src/entity/participant.entity';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/common/config/app-config.module';
import { AppConfigService } from 'src/common/config/app-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenService } from './token.service';
import { RefreshToken } from 'src/entity/refresh-token.entity';
import { EventModule } from 'src/events/event.module';
import { EventService } from 'src/events/event.service';
import { RegistrationService } from 'src/registration/registration.service';
import { EventEntity } from 'src/entity/event.entity';
import { RegistrationEntity } from 'src/entity/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      ParticipantEntity,
      RefreshToken,
      EventEntity,
      RegistrationEntity
    ]
  ),
  PassportModule,
  JwtModule.registerAsync({
    imports: [AppConfigModule],
    inject: [AppConfigService],
    useFactory: (configService: AppConfigService) => ({
      secret: configService.secretKey,
      signOptions: {
        expiresIn: configService.secretKeyExpiresIn,
      },
    }),
  }),
],
  
  controllers: [ParticipantController],
  providers: [ParticipantService, JwtStrategy, TokenService, EventService, RegistrationService],
})
export class ParticipantModule {}
