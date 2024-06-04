import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService, JwtVerifyOptions, JwtSignOptions } from "@nestjs/jwt";
import { AuthJwt } from "./interfaces/auth-jwt.interface";
import { RefreshToken } from "src/entity/refresh-token.entity";
import { ParticipantEntity } from "src/entity/participant.entity";
import { AppConfigService } from "src/common/config/app-config.service";
import { dayjs } from "src/dayjs";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService
  ) {}

  async verifyToken(token: string): Promise<AuthJwt> {
    try {
      const options: JwtVerifyOptions = {
        secret: this.appConfigService.secretKey
      };
      return await this.jwtService.verifyAsync<AuthJwt>(token, options);
    } catch (error) {
      console.error(`Token verification failed. Token: ${token}`, error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  getOneRefreshToken(token: string) {
    return this.refreshTokenRepository.findOne({ where: { token } });
  }

  generateAccessToken(user: ParticipantEntity): string {
    return this.jwtService.sign({ userId: user.id });
  }

  get accessTokenTtl() {
    return this.appConfigService.secretKeyExpiresIn;
  }

  generateRefreshToken(user: ParticipantEntity): string {
    return this.jwtService.sign(
      { userId: user.id },
      this.getRefreshTokenOptions(),
    );
  }

  generateBothTokens(user: ParticipantEntity) {
    const accessToken: string = this.generateAccessToken(user);
    const accessTokenTtl: number = this.accessTokenTtl;
    const refreshToken: string = this.generateRefreshToken(user);
    const refreshTokenTtl: number = this.appConfigService.refreshExpiresIn;

    return {
      accessToken,
      accessTokenTtl,
      refreshToken,
      refreshTokenTtl,
    };
  }

  decodeToken(token: string): AuthJwt {
    return this.jwtService.decode(token) as AuthJwt;
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, this.getRefreshTokenOptions());
  }

  async createRefreshToken(token: string, participant: ParticipantEntity): Promise<RefreshToken> {
    const refreshToken = this.refreshTokenRepository.create({
      participant,
      token,
      expiresAt: dayjs().utc().add(this.appConfigService.refreshExpiresIn, 'seconds').toDate(),
    });

    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  async removeRefreshToken(token: string, flush = false): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne({ where: { token } });
    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found');
    }

    await this.refreshTokenRepository.remove(refreshToken);

    if (flush) {
      // Очистка кэша после удаления токена
    }
  }

  private getRefreshTokenOptions(): JwtSignOptions {
    return {
      secret: this.appConfigService.refreshSecretKey,
      expiresIn: this.appConfigService.refreshExpiresIn,
    };
  }
}
