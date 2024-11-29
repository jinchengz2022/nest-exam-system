/*
  Warnings:

  - You are about to drop the column `a` on the `Exam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Exam` DROP FOREIGN KEY `Exam_examId_fkey`;

-- AlterTable
ALTER TABLE `Exam` DROP COLUMN `a`;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_createUserId_fkey` FOREIGN KEY (`createUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
