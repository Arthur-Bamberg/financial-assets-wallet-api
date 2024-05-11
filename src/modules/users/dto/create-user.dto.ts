import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsEmail(
    {},
    {
      message:
        'O email fornecido não é válido. Por favor, insira um email correto.',
    },
  )
  email: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres.' })
  password: string;
}
