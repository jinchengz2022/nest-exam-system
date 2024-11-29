import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RedisService } from '@app/redis';
import { PrismaService } from '@app/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserRegisterDTO } from './dto/user-register.dto';
import { EmailService } from '@app/email';
import { LoginUserDTO } from './dto/user-login.dto';
import { UpdatePwdUserDTO } from './dto/user-updatePwd.dto';
import { RequireLogin, UserInfo } from '@app/common';
@Controller()
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Post('Register')
  async register(@Body() data: UserRegisterDTO) {
    return await this.userService.register(data);
  }

  @Get('GetCode')
  async getCode(@Query('to') to: string, @Query('action') action: string) {
    return this.userService.getCode(to, action);
  }

  @Post('Login')
  async login(@Body() params: LoginUserDTO) {
    return this.userService.login(params);
  }

  @Get()
  @RequireLogin()
  a(@UserInfo() userInfo) {
    return userInfo
  }

  @Post('UpdatePassword')
  @SetMetadata('require-login', true)
  updatePassword(@Body() params: UpdatePwdUserDTO) {
    return this.userService.updatePassword(params);
  }
}
