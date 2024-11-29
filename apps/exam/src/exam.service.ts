import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamService {
  addExam(createExamDto: any) {
    return 'This action adds a new exam';
  }

  deleteExam() {
    return `This action returns all exam`;
  }

  examList() {
    return `This action returns a m`;
  }

  saveExam() {
    return `This action updates a `;
  }

  publishExam() {
    return `This action removes a  exam`;
  }
}
