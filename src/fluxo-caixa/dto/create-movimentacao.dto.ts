import { ApiProperty } from '@nestjs/swagger';

export class CreateMovimentacaoDto {
  @ApiProperty({
    description: 'Tipo da movimentação: entrada ou saída',
    example: 'entrada',
  })
  tipo: string;

  @ApiProperty({
    description: 'ID do produto',
    example: 1,
  })
  produto_id: number;

  @ApiProperty({
    description: 'Quantidade movimentada',
    example: 10,
  })
  quantidade: number;

  @ApiProperty({
    description: 'Preço unitário do produto',
    example: 49.9,
    required: false,
  })
  preco_unitario?: number;

  @ApiProperty({
    description: 'Descrição da movimentação',
    example: 'Compra de fornecedor',
    required: false,
  })
  descricao?: string;

  @ApiProperty({
    description: 'ID da venda (obrigatório para saídas)',
    example: 1,
    required: false,
  })
  venda_id?: number;
}
