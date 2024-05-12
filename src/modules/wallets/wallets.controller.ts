import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { AddAssetDto } from './dto/add-asset.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.walletsService.create(createWalletDto, req.user.sub);
  }

  @Post(':id/assets')
  async addAsset(
    @Param('id') id: string,
    @Body() addAssetDto: AddAssetDto,
    @Req() req: RequestWithUser,
  ) {
    await this.walletsService.validateWalletOwnership(id, req.user.sub);
    return await this.walletsService.addAsset(id, addAssetDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
