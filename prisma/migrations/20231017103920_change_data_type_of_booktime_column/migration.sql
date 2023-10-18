/*
  Warnings:

  - You are about to drop the column `bookDate` on the `bookking` table. All the data in the column will be lost.
  - You are about to drop the column `bookTime` on the `bookking` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `book_date` to the `bookking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_time` to the `bookking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookking` DROP COLUMN `bookDate`,
    DROP COLUMN `bookTime`,
    ADD COLUMN `book_date` DATE NOT NULL,
    ADD COLUMN `book_time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `price` DECIMAL NOT NULL;
