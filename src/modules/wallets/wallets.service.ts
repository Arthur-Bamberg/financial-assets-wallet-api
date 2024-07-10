import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletAssetDto } from './dto/update-wallet-asset.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { AddAssetDto } from './dto/add-asset.dto';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class WalletsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly assetsService: AssetsService,
  ) {}

  async create(createWalletDto: CreateWalletDto, userId: number) {
    return await this.prismaService.wallet.create({
      data: {
        user_id: userId,
        ...createWalletDto,
      },
    });
  }

  async validateWalletOwnership(walletId: number, userId: number) {
    const wallet = await this.prismaService.wallet.findFirst({
      where: {
        id: walletId,
        user_id: userId,
      },
    });

    if (!wallet)
      throw new NotFoundException('Carteira não encontrada para este usuário');
  }

  async addAsset(walletId: number, addAssetDto: AddAssetDto) {
    return await this.prismaService.walletAsset.create({
      data: {
        wallet_id: walletId,
        ...addAssetDto,
      },
    });
  }

  findAll() {
    return `This action returns all wallets`;
  }

  async findOne(walletId: number) {
    await this.assetsService.updatePrices(walletId);

    return await this.prismaService.wallet.findUnique({
      include: {
        wallets_assets: {
          orderBy: { rank: 'asc' },
          include: {
            asset: {
              include: {
                type: true,
              },
            },
          },
        },
      },
      where: { id: walletId },
    });
  }

  async updateWalletAsset(
    walletId: number,
    assetId: number,
    updateWalletAssetDto: UpdateWalletAssetDto,
  ) {
    const walletAsset = await this.prismaService.walletAsset.findUnique({
      where: {
        asset_id_wallet_id: {
          asset_id: assetId,
          wallet_id: walletId,
        },
      },
    });

    if (!walletAsset)
      throw new NotFoundException('Ativo não encontrado na carteira');

    return await this.prismaService.walletAsset.update({
      data: updateWalletAssetDto,
      where: {
        asset_id_wallet_id: {
          asset_id: assetId,
          wallet_id: walletId,
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
