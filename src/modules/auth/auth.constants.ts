import type { SignOptions } from 'jsonwebtoken';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'SUPER_SECRET_JWT_KEY',
  expiresIn: (process.env.JWT_EXPIRES_IN || '2h') as SignOptions['expiresIn'],
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'SUPER_SECRET_REFRESH_KEY',
  refreshExpiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
};
