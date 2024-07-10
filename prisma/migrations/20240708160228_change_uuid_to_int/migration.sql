/*
  Warnings:

  - The primary key for the `assets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `assets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `types` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `wallets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `wallets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `wallets_assets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `wallets_assets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type_id` on the `assets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `wallets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `asset_id` on the `wallets_assets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `wallet_id` on the `wallets_assets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_type_id_fkey";

-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wallets_assets" DROP CONSTRAINT "wallets_assets_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "wallets_assets" DROP CONSTRAINT "wallets_assets_wallet_id_fkey";

-- AlterTable
ALTER TABLE "assets" DROP CONSTRAINT "assets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "type_id",
ADD COLUMN     "type_id" INTEGER NOT NULL,
ADD CONSTRAINT "assets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "types" DROP CONSTRAINT "types_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "types_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "wallets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "wallets_assets" DROP CONSTRAINT "wallets_assets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "asset_id",
ADD COLUMN     "asset_id" INTEGER NOT NULL,
DROP COLUMN "wallet_id",
ADD COLUMN     "wallet_id" INTEGER NOT NULL,
ADD CONSTRAINT "wallets_assets_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_assets_asset_id_wallet_id_key" ON "wallets_assets"("asset_id", "wallet_id");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets_assets" ADD CONSTRAINT "wallets_assets_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets_assets" ADD CONSTRAINT "wallets_assets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
