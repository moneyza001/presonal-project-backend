/*
  Warnings:

  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `status` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'DENINED') NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;
