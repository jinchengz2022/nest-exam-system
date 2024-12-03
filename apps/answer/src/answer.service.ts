import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { AnswerCreateDTO } from './dto/answer-create.dto';

@Injectable()
export class AnswerService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  addAnswer(createAnswerDto: AnswerCreateDTO, userId: number) {
    return this.prismaService.answer.create({
      data: {
        content: createAnswerDto.content,
        score: 0,
        answer: {
          connect: {
            userId,
          },
        },
        exam: {
          connect: {
            examId: createAnswerDto.examId,
          },
        },
      },
    });
    // return 'This action adds a new answer';
  }

  answerList() {
    return this.prismaService.answer.findMany()
    // return `This action returns all answer`;
  }

  answerExport() {
    return `This action returns a r`;
  }
}
