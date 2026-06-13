import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable()
export class PasswordService {
  async hash(value: string) {
    return bcrypt.hash(value, AUTH_CONSTANTS.BCRYPT_ROUNDS);
  }

  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }

  generateRecoveryToken() {
    return randomBytes(
      AUTH_CONSTANTS.RECOVERY_TOKEN_BYTES,
    ).toString('hex');
  }
}