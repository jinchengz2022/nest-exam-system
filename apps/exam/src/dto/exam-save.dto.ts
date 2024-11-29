import { IsNotEmpty } from 'class-validator';

export class ExamSaveDTO {
  @IsNotEmpty({
    message: '试卷id不能为空',
  })
  examId: number;

  @IsNotEmpty({
    message: '考试内容不能为空',
  })
  content: string;
}

