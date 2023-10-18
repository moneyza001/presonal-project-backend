/*
  Warnings:

  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `bookking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `book_service` DROP FOREIGN KEY `book_service_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookking` DROP FOREIGN KEY `bookking_hairStyleListId_fkey`;

-- DropForeignKey
ALTER TABLE `bookking` DROP FOREIGN KEY `bookking_user_id_fkey`;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;

-- DropTable
DROP TABLE `bookking`;

-- CreateTable
CREATE TABLE `booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `book_date` DATE NOT NULL,
    `book_time` VARCHAR(191) NOT NULL,
    `url_deposite` VARCHAR(191) NULL,
    `url_full_pay` VARCHAR(191) NULL,
    `total_price` DECIMAL(10, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deposite_status` BOOLEAN NULL,
    `hairStyleListId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_hairStyleListId_fkey` FOREIGN KEY (`hairStyleListId`) REFERENCES `hair_stylelist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_service` ADD CONSTRAINT `book_service_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
