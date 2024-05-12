import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { AddAssetDto } from './dto/add-asset.dto';

@Injectable()
export class WalletsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWalletDto: CreateWalletDto, userId: string) {
    return await this.prismaService.wallet.create({
      data: {
        user_id: userId,
        amount: 0,
        ...createWalletDto,
      },
    });
  }

  async validateWalletOwnership(walletId: string, userId: string) {
    const wallet = await this.prismaService.wallet.findFirst({
      where: {
        id: walletId,
        user_id: userId,
      },
    });

    if (!wallet)
      throw new NotFoundException('Carteira não encontrada para este usuário');
  }

  async addAsset(walletId: string, addAssetDto: AddAssetDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
