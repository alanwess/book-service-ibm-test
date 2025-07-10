import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '85-359-0277-5', description: 'SBN do livro' })
  sbn: string;

  @IsString()
  @ApiProperty({ example: 'Autobiografia de Alan', description: 'Nome do livro' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Uma perspectiva sobre Alan', description: 'Descrição do livro' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'Alan', description: 'Autor do livro' })
  author: string;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Quantidade em estoque' })
  stock: number;
}
