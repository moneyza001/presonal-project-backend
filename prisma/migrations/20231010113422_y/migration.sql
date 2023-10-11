/*
  Warnings:

  - You are about to drop the `MemberInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MemberInfo` DROP FOREIGN KEY `MemberInfo_userId_fkey`;

-- DropTable
DROP TABLE `MemberInfo`;

-- CreateTable
CREATE TABLE `MemberInfomation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `nick_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `birth_date` DATE NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `image` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MemberInfomation` ADD CONSTRAINT `MemberInfomation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
