import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RequireLogin, UserInfo } from '@app/common';
import { ExamCreateDTO } from './dto/exam-create.dto';
import { ExamSaveDTO } from './dto/exam-save.dto';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('AddExam')
  @RequireLogin()
  addExam(@Body() createExamDto: ExamCreateDTO, @UserInfo() userInfo) {
    return this.examService.addExam({
      ...createExamDto,
      userId: userInfo.userId,
    });
  }

  @Delete('DeleteExam/:id')
  @RequireLogin()
  deleteExam(@UserInfo('userId') userId: number, @Param('id') id: number) {
    return this.examService.deleteExam(userId, id);
  }

  @Get('ExamList')
  @RequireLogin()
  examList(
    @UserInfo('userId') userId: number,
    @Query('pageSize') pageSize: number,
    @Query('pageNumber') pageNumber: number,
    @Query('name') name?: string,
  ) {
    return this.examService.examList({
      pageSize,
      pageNumber,
      userId,
      name,
    });
  }

  @Post('SaveExam')
  @RequireLogin()
  saveExam(@Body() params: ExamSaveDTO) {
    return this.examService.saveExam(params);
  }

  @Put('PublishExam/:id')
  @RequireLogin()
  publishExam(@Param('id') id: number) {
    return this.examService.publishExam(id);
  }

  @MessagePattern('sum')
  sum(numArr: number[]): number {
    return numArr.reduce((pre, cur) => pre + cur, 0);
  }
}
