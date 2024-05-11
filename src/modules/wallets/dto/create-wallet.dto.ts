import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(3, 50, { message: 'O nome deve ter entre 3 e 50 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @Length(10, 200, {
    message: 'A descrição deve ter entre 10 e 200 caracteres.',
  })
  description: string;
}
