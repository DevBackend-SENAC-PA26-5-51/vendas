import { ApiProperty } from '@nestjs/swagger';

export class CreatePagamentoDto {
  @ApiProperty({
    description: 'Método de pagamento',
    example: 'cartao_credito',
    required: false,
  })
  metodo_pagamento?: string;

  @ApiProperty({
    description: 'Valor do pagamento',
    example: 149.9,
    required: false,
  })
  valo_pagamento?: number;

  @ApiProperty({
    description: 'Status do pagamento',
    example: 'aprovado',
    required: false,
  })
  status_pagamento?: string;

  @ApiProperty({
    description: 'Data do pagamento',
    example: '2026-09-10',
    required: false,
  })
  data_pagamento?: string;

  @ApiProperty({ description: 'ID da venda relacionada', example: 1 })
  vendas_id: number;
}
