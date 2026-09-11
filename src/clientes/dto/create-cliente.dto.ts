import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'CPF do cliente (deve ser único)',
    example: '123.456.789-00',
  })
  cpf: string;

  @ApiProperty({ description: 'Nome completo do cliente', example: 'Maria Silva' })
  nome: string;

  @ApiProperty({
    description: 'Telefone/contato do cliente',
    example: '(11) 98765-4321',
    required: false,
  })
  contato?: string;

  @ApiProperty({
    description: 'Endereço do cliente',
    example: 'Rua das Flores, 123 - São Paulo/SP',
    required: false,
  })
  endereco?: string;

  @ApiProperty({
    description: 'E-mail do cliente',
    example: 'maria.silva@email.com',
    required: false,
  })
  email?: string;
}
