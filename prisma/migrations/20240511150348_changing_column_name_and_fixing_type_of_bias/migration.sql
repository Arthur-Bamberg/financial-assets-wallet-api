/*
  Warnings:

  - You are about to drop the column `amount_invested` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `amount` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "amount_invested",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "wallets_assets" ALTER COLUMN "bias" SET DATA TYPE TEXT;
