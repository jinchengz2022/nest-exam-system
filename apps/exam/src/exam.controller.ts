import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('AddExam')
  addExam(@Body() createExamDto: any) {
    return this.examService.addExam(createExamDto);
  }

  @Delete('DeleteExam')
  deleteExam() {
    return this.examService.deleteExam();
  }

  @Get('ExamList')
  examList() {
    return this.examService.examList();
  }

  @Post('SaveExam')
  saveExam() {
    return this.examService.saveExam();
  }

  @Delete('PublishExam')
  publishExam() {
    return this.examService.publishExam();
  }

  @MessagePattern('sum')
  sum(numArr: number[]): number {
    return numArr.reduce((pre, cur) => pre + cur, 0)
  }
}
