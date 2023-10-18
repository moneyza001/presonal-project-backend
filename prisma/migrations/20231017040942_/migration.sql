/*
  Warnings:

  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `hairStyleListId` to the `bookking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookking` ADD COLUMN `hairStyleListId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;

-- AddForeignKey
ALTER TABLE `bookking` ADD CONSTRAINT `bookking_hairStyleListId_fkey` FOREIGN KEY (`hairStyleListId`) REFERENCES `hair_stylelist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
