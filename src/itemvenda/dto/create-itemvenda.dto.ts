import { ApiProperty } from '@nestjs/swagger';

export class CreateItemVendaDto {
  @ApiProperty({
    description: 'Quantidade do produto na venda',
    example: 2,
    required: false,
  })
  quantidade?: number;

  @ApiProperty({
    description: 'Preço unitário do produto na venda',
    example: 49.9,
    required: false,
  })
  preco?: number;

  @ApiProperty({
    description: 'ID da venda associada',
    example: 1,
  })
  vendas_id: number;

  @ApiProperty({
    description: 'ID do produto associado',
    example: 1,
  })
  produtos_id: number;
}
