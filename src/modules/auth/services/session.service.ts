
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PasswordService } from './password.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable()
export class SessionService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly passwordService: PasswordService,
  ) {}

  generateSessionId() {
    return randomBytes(
      AUTH_CONSTANTS.SESSION_BYTES,
    ).toString('hex');
  }

  async save(
    userId: number,
    sessionId: string,
    refreshToken: string,
  ) {
    const hash =
      await this.passwordService.hash(
        refreshToken,
      );

    await this.usuariosService.updateSession(
      userId,
      sessionId,
      hash,
    );
  }

  async clear(userId: number) {
    await this.usuariosService.clearSession(
      userId,
    );
  }
}