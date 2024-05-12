/*
  Warnings:

  - You are about to alter the column `quantity` on the `wallets_assets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "wallets_assets" ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
