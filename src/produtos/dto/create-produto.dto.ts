import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Camiseta Básica' })
  nome: string;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 100,
    required: false,
  })
  quantidade?: number;

  @ApiProperty({
    description: 'Tipo/categoria do produto',
    example: 'Vestuário',
    required: false,
  })
  tipo?: string;

  @ApiProperty({
    description: 'Preço unitário do produto',
    example: 49.9,
    required: false,
  })
  preco?: number;
}
