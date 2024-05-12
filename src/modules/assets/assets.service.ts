import { Injectable } from '@nestjs/common';
import { FinanceService } from 'src/common/services/finance.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { subtractMinutes } from 'src/common/utils';

@Injectable()
export class AssetsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly financeService: FinanceService,
  ) {}

  async updatePrices(walletId: string): Promise<void> {
    const tenMinutesAgo = subtractMinutes(10);

    const assets = await this.prismaService.asset.findMany({
      where: {
        updated_at: { lt: tenMinutesAgo },
        wallets_assets: { some: { wallet_id: walletId } },
      },
    });

    await Promise.all(
      assets.map(async (asset) => {
        const price = await this.financeService.getStockValue(asset.short_name);

        if (!price) return;

        await this.prismaService.asset.update({
          where: { id: asset.id },
          data: { price, updated_at: new Date() },
        });
      }),
    );
  }
}
