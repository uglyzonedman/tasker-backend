import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) {
      throw new BadRequestException('Данная почта занята');
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        login: dto.login,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  }

  async login(dto: AuthDto) {
    let user;
    if (dto.email.includes('@')) {
      user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    } else {
      user = await this.prisma.user.findUnique({
        where: {
          login: dto.email,
        },
      });
    }

    if (!user) {
      throw new HttpException('Данные неверные', HttpStatus.UNAUTHORIZED);
    }

    if (user.isActivated == false) {
      throw new HttpException('Аккаунт неактивирован', HttpStatus.UNAUTHORIZED);
    }

    const checkPass = await verify(user.password, dto.password);

    if (!checkPass) {
      throw new HttpException('Неверный пароль', HttpStatus.FORBIDDEN);
    }

    const tokens = await this.createToken(user.id, user.email);

    return {
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
    };
  }

  createToken(userId: number, email: string) {
    const data = {
      id: userId,
      email,
    };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });

    return { accessToken };
  }
}
