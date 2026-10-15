import { ApiProperty } from '@nestjs/swagger';

export class CreateVendaDto {
  @ApiProperty({
    description: 'Status da venda',
    example: 'pendente',
    required: false,
  })
  id_status?: string;

  @ApiProperty({ description: 'ID do cliente comprador', example: 1 })
  cliente_id: number;

  @ApiProperty({ description: 'ID da transportadora', example: 1 })
  transportadoras_id: number;

  @ApiProperty({ description: 'ID do funcionário responsável', example: 1 })
  funcionarios_id: number;
}
