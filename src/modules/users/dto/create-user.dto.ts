import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '`name` deve ser um texto.' })
  @IsNotEmpty({ message: '`name` não pode ser vazio.' })
  name: string;

  @IsEmail(
    {},
    {
      message:
        '`email` fornecido não é válido. Por favor, insira um email correto.',
    },
  )
  email: string;

  @IsString({ message: '`password` deve ser um texto.' })
  @Length(8, 20, { message: '`password` deve ter entre 8 e 20 caracteres.' })
  password: string;
}
