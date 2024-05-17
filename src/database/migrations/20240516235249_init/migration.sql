/*
  Warnings:

  - You are about to drop the column `authorId` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Task_authorId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `status` ENUM('completed', 'pending', 'inProgress') NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
