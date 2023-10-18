/*
  Warnings:

  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `status` ENUM('PENDING', 'ACCEPTED', 'DENINED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;
