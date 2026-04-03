import type { SignOptions } from 'jsonwebtoken';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'SUPER_SECRET_JWT_KEY',
  expiresIn: (process.env.JWT_EXPIRES_IN || '3600s') as SignOptions['expiresIn'],
};
