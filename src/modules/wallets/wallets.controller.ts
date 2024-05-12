import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { AddAssetDto } from './dto/add-asset.dto';
import { UpdateWalletAssetDto } from './dto/update-wallet-asset.dto';

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
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException(
            'O id da carteira deve UUID deve ser válido e da versão 4',
          ),
      }),
    )
    id: string,
    @Body() addAssetDto: AddAssetDto,
    @Req() req: RequestWithUser,
  ) {
    await this.walletsService.validateWalletOwnership(id, req.user.sub);
    return await this.walletsService.addAsset(id, addAssetDto);
  }

  @Patch(':walletId/assets/:assetId')
  async update(
    @Param(
      'walletId',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException(
            'O id da carteira deve UUID deve ser válido e da versão 4',
          ),
      }),
    )
    walletId: string,
    @Param(
      'assetId',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException(
            'O id do ativo deve UUID deve ser válido e da versão 4',
          ),
      }),
    )
    assetId: string,
    @Body() updateWalletAssetDto: UpdateWalletAssetDto,
    @Req() req: RequestWithUser,
  ) {
    await this.walletsService.validateWalletOwnership(walletId, req.user.sub);
    return await this.walletsService.updateWalletAsset(
      walletId,
      assetId,
      updateWalletAssetDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') walletId: string, @Req() req: RequestWithUser) {
    await this.walletsService.validateWalletOwnership(walletId, req.user.sub);
    return await this.walletsService.findOne(walletId);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
