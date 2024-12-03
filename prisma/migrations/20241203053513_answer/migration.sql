/*
  Warnings:

  - You are about to drop the column `a` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `answerExamId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Answer` DROP FOREIGN KEY `Answer_answerId_fkey`;

-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `a`,
    DROP COLUMN `examId`,
    ADD COLUMN `answerExamId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_answerUserId_fkey` FOREIGN KEY (`answerUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_answerExamId_fkey` FOREIGN KEY (`answerExamId`) REFERENCES `Exam`(`examId`) ON DELETE RESTRICT ON UPDATE CASCADE;
