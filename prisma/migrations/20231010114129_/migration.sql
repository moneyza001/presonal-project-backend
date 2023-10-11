/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HairStyleList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HairStyleListService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberInfomation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookService` DROP FOREIGN KEY `BookService_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookService` DROP FOREIGN KEY `BookService_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `HairStyleList` DROP FOREIGN KEY `HairStyleList_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `HairStyleListService` DROP FOREIGN KEY `HairStyleListService_hair_style_list_id_fkey`;

-- DropForeignKey
ALTER TABLE `HairStyleListService` DROP FOREIGN KEY `HairStyleListService_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `MemberInfomation` DROP FOREIGN KEY `MemberInfomation_userId_fkey`;

-- DropTable
DROP TABLE `Book`;

-- DropTable
DROP TABLE `BookService`;

-- DropTable
DROP TABLE `HairStyleList`;

-- DropTable
DROP TABLE `HairStyleListService`;

-- DropTable
DROP TABLE `MemberInfomation`;

-- DropTable
DROP TABLE `Service`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_infomation` (
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

-- CreateTable
CREATE TABLE `hair_stylelist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hair_style_list_name` VARCHAR(191) NOT NULL,
    `hair_style_list_image` VARCHAR(191) NULL,
    `work_exe_image` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hair_stylelist_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `hair_style_list_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `bookDate` DATE NOT NULL,
    `bookTime` TIME(4) NOT NULL,
    `url_deposite` VARCHAR(191) NULL,
    `url_full_pay` VARCHAR(191) NULL,
    `total_price` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deposite_status` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_infomation` ADD CONSTRAINT `member_infomation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hair_stylelist` ADD CONSTRAINT `hair_stylelist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hair_stylelist_service` ADD CONSTRAINT `hair_stylelist_service_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hair_stylelist_service` ADD CONSTRAINT `hair_stylelist_service_hair_style_list_id_fkey` FOREIGN KEY (`hair_style_list_id`) REFERENCES `hair_stylelist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookking` ADD CONSTRAINT `bookking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_service` ADD CONSTRAINT `book_service_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `bookking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_service` ADD CONSTRAINT `book_service_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
