import { ApiProperty } from '@nestjs/swagger';

export class CreateEstoqueDto {
  @ApiProperty({ description: 'ID do produto movimentado', example: 1 })
  produto_id: number;

  @ApiProperty({
    description: 'Quantidade da movimentação (positivo = entrada, negativo = saída)',
    example: 10,
  })
  quantidade: number;
}
