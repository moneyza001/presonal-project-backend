/*
  Warnings:

  - You are about to alter the column `total_price` on the `bookking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `bookking` MODIFY `total_price` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;
