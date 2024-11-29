-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` CHAR(20) NOT NULL,
    `password` CHAR(20) NOT NULL,
    `email` CHAR(30) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_userName_key`(`userName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `examId` INTEGER NOT NULL AUTO_INCREMENT,
    `createUserId` INTEGER NOT NULL,
    `name` CHAR(20) NOT NULL,
    `isPublish` BOOLEAN NOT NULL DEFAULT false,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `content` CHAR(100) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `a` INTEGER NOT NULL,

    UNIQUE INDEX `Exam_examId_key`(`examId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `answerId` INTEGER NOT NULL AUTO_INCREMENT,
    `answerUserId` INTEGER NOT NULL,
    `examId` INTEGER NOT NULL,
    `content` CHAR(100) NOT NULL,
    `score` INTEGER NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `a` INTEGER NOT NULL,

    UNIQUE INDEX `Answer_answerId_key`(`answerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
