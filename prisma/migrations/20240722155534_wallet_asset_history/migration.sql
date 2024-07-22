-- CreateTable
CREATE TABLE "wallets_assets_history" (
    "id" SERIAL NOT NULL,
    "wallet_asset_id" INTEGER NOT NULL,
    "price_ceiling" DOUBLE PRECISION,
    "rank" INTEGER NOT NULL,
    "bias" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_assets_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallets_assets_history" ADD CONSTRAINT "wallets_assets_history_wallet_asset_id_fkey" FOREIGN KEY ("wallet_asset_id") REFERENCES "wallets_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
