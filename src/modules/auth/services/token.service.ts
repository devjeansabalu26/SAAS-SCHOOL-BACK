
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: AUTH_CONSTANTS.JWT_SECRET,
      expiresIn: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  generateRefreshToken(
    payload: {
      sub: number;
      sessionId: string;
    },
  ) {
    return this.jwtService.sign(payload, {
      secret: AUTH_CONSTANTS.JWT_REFRESH_SECRET,
      expiresIn:
        AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: AUTH_CONSTANTS.JWT_REFRESH_SECRET,
    });
  }
}