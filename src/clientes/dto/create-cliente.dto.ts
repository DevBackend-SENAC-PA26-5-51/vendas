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
    description: 'Rua do endereço do cliente',
    example: 'Rua das Flores',
    required: false,
  })
  rua?: string;

  @ApiProperty({
    description: 'Número da casa do endereço do cliente',
    example: 123,
    required: false,
  })
  numero?: number;

  @ApiProperty({
    description: 'Complemento do endereço do cliente',
    example: 'Apto 101',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    description: 'Cidade do endereço do cliente',
    example: 'São Paulo',
    required: false,
  })
  cidade?: string;

  @ApiProperty({
    description: 'Estado do endereço do cliente',
    example: 'SP',
    required: false,
  })
  estado?: string;

  @ApiProperty({
    description: 'E-mail do cliente',
    example: 'maria.silva@email.com',
    required: false,
  })
  email?: string;
}