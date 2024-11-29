import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Inject('EXAM_SERVICE')
  private examService: ClientProxy;

  @Get()
  async sum() {
    const res = await firstValueFrom(this.examService.send('sum', [1, 2, 3]));
    return res
  }

  @Post('AddAnswer')
  addAnswer(@Body() createAnswerDto: any) {
    return this.answerService.addAnswer(createAnswerDto);
  }

  @Get('AnswerList')
  answerList() {
    return this.answerService.answerList();
  }

  @Get('AnswerExport')
  answerExport() {
    return this.answerService.answerExport();
  }
}
