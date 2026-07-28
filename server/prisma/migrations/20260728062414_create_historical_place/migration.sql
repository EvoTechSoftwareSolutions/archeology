/*
  Warnings:

  - Added the required column `anchorXPct` to the `HistoricalPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anchorYPct` to the `HistoricalPlace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HistoricalPlace` ADD COLUMN `anchorXPct` DOUBLE NOT NULL,
    ADD COLUMN `anchorYPct` DOUBLE NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;
