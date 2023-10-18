/*
  Warnings:

  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;
