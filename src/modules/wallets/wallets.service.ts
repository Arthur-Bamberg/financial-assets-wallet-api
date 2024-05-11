import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/common/services/prisma.service';

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
