import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { FinanceService } from 'src/common/services/finance.service';

@Module({
  providers: [AssetsService, PrismaService, FinanceService],
  exports: [AssetsService],
})
export class AssetsModule {}
