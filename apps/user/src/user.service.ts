import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRegisterDTO } from './dto/user-register.dto';
import { md5 } from './util/md5';
import { EmailService } from '@app/email';
import { LoginUserDTO } from './dto/user-login.dto';
import { UpdatePwdUserDTO } from './dto/user-updatePwd.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async register(data: UserRegisterDTO) {
    const captcha = await this.redisService.get(`register_${data.email}`);
    if (!captcha) {
      throw new BadRequestException('验证码已失效');
    }

    if (captcha !== data.captcha) {
      throw new BadRequestException('验证码错误');
    }

    const user = await this.prismaService.user.findUnique({
      where: { userName: data.userName },
    });

    if (user) {
      throw new BadRequestException('该用户已存在请重新输入');
    }

    try {
      await this.prismaService.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          password: md5(data.password),
        },
      });
      return 'success';
    } catch (error) {
      console.log(String(error));

      return 'error';
    }
  }

  async getCode(to: string, action?: string) {
    const code = Math.random().toString().substring(2, 8);
    try {
      await this.emailService.sendMail({ to, subject: `验证码为：${code}` });
      this.redisService.set(`${action ?? 'register'}_${to}`, code);
      return 'success';
    } catch (error) {}
  }

  async login(params: LoginUserDTO) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        userName: params.userName,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('该用户不存在');
    }

    if (foundUser.password !== md5(params.password)) {
      throw new BadRequestException('密码错误');
    }

    return {
      token: this.jwtService.sign(
        {
          userId: foundUser.userId,
          userName: foundUser.userName,
        },
        {
          expiresIn: '7d',
        },
      ),
      ...foundUser,
    };
  }

  async updatePassword(params: UpdatePwdUserDTO) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        userName: params.userName,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('该用户不存在');
    }

    const captcha = await this.redisService.get(`updatePwd_${params.email}`);

    if (!captcha) {
      throw new BadRequestException('验证码已失效');
    }

    if (captcha !== params.captcha) {
      throw new BadRequestException('验证码错误');
    }

    try {
      await this.prismaService.user.update({
        where: {
          userName: params.userName,
        },
        data: {
          userName: params.userName,
          password: md5(params.password),
          email: params.email,
        },
      });
      return 'success';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
