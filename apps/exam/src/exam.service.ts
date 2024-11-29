import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ExamCreateDTO } from './dto/exam-create.dto';
import { PrismaService } from '@app/prisma';
import { ExamSaveDTO } from './dto/exam-save.dto';

@Injectable()
export class ExamService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async addExam(createExamDto: ExamCreateDTO & { userId: number }) {
    try {
      await this.prismaService.exam.create({
        data: {
          name: createExamDto.name,
          content: createExamDto.content,
          createUesr: {
            connect: {
              userId: createExamDto.userId,
            },
          },
        },
      });
      return 'success';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteExam(userId: number, id: number) {
    try {
      await this.prismaService.exam.update({
        where: {
          createUserId: userId,
          examId: id,
        },
        data: {
          isDelete: true,
        },
      });
      return 'success';
    } catch (error) {
      throw new BadRequestException(String(error));
    }
  }

  async examList(params: {
    pageSize: number;
    pageNumber: number;
    userId: number;
    name?: string;
  }) {
    const { pageNumber, pageSize, userId, name } = params;
    const skip = pageSize * pageNumber - 1;

    const condition: Record<string, any> = {};

    if (name) {
      condition.name = name;
    }

    const list = await this.prismaService.exam.findMany({
      where: {
        createUserId: userId,
        ...condition,
        isDelete: false,
      },
      // skip,
      // take: pageNumber,
    });
    return { list };
  }

  async saveExam(params: ExamSaveDTO) {
    try {
      await this.prismaService.exam.update({
        where: {
          examId: params.examId,
        },
        data: {
          content: params.content,
        },
      });
      return 'success';
    } catch (error) {
      throw new BadRequestException(String(error));
    }
  }

  async publishExam(id: number) {
    try {
      await this.prismaService.exam.update({
        where: {
          examId: id,
        },
        data: {
          isPublish: true,
        },
      });
      return 'success';
    } catch (error) {
      throw new BadRequestException(String(error));
    }
  }
}
