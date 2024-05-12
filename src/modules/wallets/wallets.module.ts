import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [AssetsModule],
  controllers: [WalletsController],
  providers: [WalletsService, PrismaService],
})
export class WalletsModule {}
