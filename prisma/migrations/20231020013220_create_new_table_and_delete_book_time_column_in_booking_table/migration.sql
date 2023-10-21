/*
  Warnings:

  - You are about to drop the column `book_time` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `bookTimeId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `book_time`,
    ADD COLUMN `bookTimeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `BookTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_bookTimeId_fkey` FOREIGN KEY (`bookTimeId`) REFERENCES `BookTime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
