import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  addAnswer(createAnswerDto: any) {
    return 'This action adds a new answer';
  }

  answerList() {
    return `This action returns all answer`;
  }

  answerExport() {
    return `This action returns a r`;
  }
}
