import { IsNotEmpty } from 'class-validator';

export class ExamCreateDTO {
  @IsNotEmpty({
    message: '考试名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '考试内容不能为空',
  })
  content: string;
}
