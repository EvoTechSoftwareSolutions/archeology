/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `HistoricalPlace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `HistoricalPlace` ADD COLUMN `focusKeywords` VARCHAR(191) NULL,
    ADD COLUMN `metaDescription` VARCHAR(191) NULL,
    ADD COLUMN `nearbyHospitals` VARCHAR(191) NULL,
    ADD COLUMN `nearbyHotels` VARCHAR(191) NULL,
    ADD COLUMN `nearbyRestaurant` VARCHAR(191) NULL,
    ADD COLUMN `seoTitle` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `travelTips` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PlaceGalleryImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `historicalPlaceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `HistoricalPlace_slug_key` ON `HistoricalPlace`(`slug`);

-- AddForeignKey
ALTER TABLE `PlaceGalleryImage` ADD CONSTRAINT `PlaceGalleryImage_historicalPlaceId_fkey` FOREIGN KEY (`historicalPlaceId`) REFERENCES `HistoricalPlace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
