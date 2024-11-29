import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
import { AnswerModule } from './answer/answer.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '202411',
      host: 'localhost',
      port: 3306,
      poolSize: 10,
      synchronize: true,
      logging: true,
      database: 'student_test',
      entities: [],
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    RedisModule,
    UserModule,
    ExamModule,
    AnswerModule,
    AnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
