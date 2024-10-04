import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRED || '1d',
}));

