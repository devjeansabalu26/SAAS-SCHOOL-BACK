import type { SignOptions } from 'jsonwebtoken';

export const AUTH_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET || 'SUPER_SECRET_JWT_KEY',
  ACCESS_TOKEN_EXPIRES_IN:
    (process.env.JWT_EXPIRES_IN || '2h') as SignOptions['expiresIn'],

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || 'SUPER_SECRET_REFRESH_KEY',

  REFRESH_TOKEN_EXPIRES_IN:
    (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'],

  BCRYPT_ROUNDS: 10,
  RECOVERY_TOKEN_BYTES: 24,
  SESSION_BYTES: 24,
};

export const jwtConstants = {
  secret: AUTH_CONSTANTS.JWT_SECRET,
  expiresIn: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN,
  refreshSecret: AUTH_CONSTANTS.JWT_REFRESH_SECRET,
  refreshExpiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN,
};