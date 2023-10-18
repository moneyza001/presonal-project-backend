/*
  Warnings:

  - You are about to drop the column `hairStyleListId` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `hair_stylelist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hair_stylelist_service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hairStylistId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `booking_hairStyleListId_fkey`;

-- DropForeignKey
ALTER TABLE `hair_stylelist` DROP FOREIGN KEY `hair_stylelist_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `hair_stylelist_service` DROP FOREIGN KEY `hair_stylelist_service_hair_style_list_id_fkey`;

-- DropForeignKey
ALTER TABLE `hair_stylelist_service` DROP FOREIGN KEY `hair_stylelist_service_service_id_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `hairStyleListId`,
    ADD COLUMN `hairStylistId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;

-- DropTable
DROP TABLE `hair_stylelist`;

-- DropTable
DROP TABLE `hair_stylelist_service`;

-- CreateTable
CREATE TABLE `hair_stylist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hair_stylist_name` VARCHAR(191) NOT NULL,
    `hair_stylist_image` VARCHAR(191) NULL,
    `work_exe_image` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hair_stylist_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `hair_style_list_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hair_stylist` ADD CONSTRAINT `hair_stylist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hair_stylist_service` ADD CONSTRAINT `hair_stylist_service_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hair_stylist_service` ADD CONSTRAINT `hair_stylist_service_hair_style_list_id_fkey` FOREIGN KEY (`hair_style_list_id`) REFERENCES `hair_stylist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_hairStylistId_fkey` FOREIGN KEY (`hairStylistId`) REFERENCES `hair_stylist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
