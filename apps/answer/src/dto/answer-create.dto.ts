import { IsNotEmpty } from 'class-validator';

export class AnswerCreateDTO {
    @IsNotEmpty({
        'message': '内容不能为空'
    })
    content: string;

    @IsNotEmpty()
    examId: number;
}