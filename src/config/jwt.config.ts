import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (): Promise<JwtModuleOptions> => ({
  secret: process.env.JWT_SECRET,
});
