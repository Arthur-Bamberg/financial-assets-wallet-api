import { AddAssetDto } from './add-asset.dto';
import {
  IsInt,
  IsString,
  Min,
  Length,
  IsNumber,
  ValidateIf,
  IsOptional,
} from 'class-validator';

export class UpdateWalletAssetDto implements Omit<AddAssetDto, 'asset_id'> {
  @IsOptional()
  @ValidateIf((o) => o.price_ceiling != null)
  @IsNumber({}, { message: '`price_ceiling` deve ser um número.' })
  @Min(0, { message: '`price_ceiling` deve ser maior ou igual a 0.' })
  price_ceiling?: number | null;

  @IsOptional()
  @IsInt({ message: '`rank` deve ser um número inteiro.' })
  @Min(1, { message: '`rank` deve ser maior ou igual a 1.' })
  rank: number;

  @IsOptional()
  @IsString({ message: '`bias` deve ser uma string.' })
  @Length(1, 50, { message: '`bias` deve ter entre 1 e 50 caracteres.' })
  bias: string;

  @IsOptional()
  @IsInt({ message: '`quantity` deve ser um número inteiro.' })
  @Min(0, { message: '`quantity` deve ser maior ou igual a 0.' })
  quantity: number;
}
