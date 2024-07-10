import {
  IsInt,
  IsString,
  Min,
  Length,
  IsNumber,
  ValidateIf,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class AddAssetDto {
  @IsNumber({}, { message: '`asset_id` deve ser um número.' })
  @IsInt({ message: '`asset_id` deve ser um número inteiro.' })
  @IsPositive({ message: '`asset_id` deve ser um número positivo.' })
  asset_id: number;

  @IsOptional()
  @ValidateIf((o) => o.price_ceiling != null)
  @IsNumber({}, { message: '`price_ceiling` deve ser um número.' })
  @Min(0, { message: '`price_ceiling` deve ser maior ou igual a 0.' })
  price_ceiling?: number | null;

  @IsInt({ message: '`rank` deve ser um número inteiro.' })
  @Min(1, { message: '`rank` deve ser maior ou igual a 1.' })
  rank: number;

  @IsString({ message: '`bias` deve ser uma string.' })
  @Length(1, 50, { message: '`bias` deve ter entre 1 e 50 caracteres.' })
  bias: string;

  @IsInt({ message: '`quantity` deve ser um número inteiro.' })
  @Min(0, { message: '`quantity` deve ser maior ou igual a 0.' })
  quantity: number;
}
