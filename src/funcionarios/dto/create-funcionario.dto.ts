import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'João Silva',
    required: false,
  })
  nome?: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '123.456.789-00',
    required: false,
  })
  cpf?: string;

  @ApiProperty({
    description: 'RG do funcionário',
    example: '12.345.678-9',
    required: false,
  })
  rg?: string;

  @ApiProperty({
    description: 'Data de nascimento do funcionário',
    example: '1990-05-15',
    required: false,
  })
  data_nasc?: Date;

  @ApiProperty({
    description: 'Estado civil do funcionário',
    example: 'Solteiro',
    required: false,
  })
  estado_civil?: string;

  @ApiProperty({
    description: 'Contato/telefone do funcionário',
    example: '(11) 99999-9999',
    required: false,
  })
  contato?: string;

  @ApiProperty({
    description: 'ID do endereço associado',
    example: 1,
  })
  endereco_id: number;

  @ApiProperty({
    description: 'ID do cargo associado',
    example: 1,
  })
  cargo_id: number;

  @ApiProperty({
    description: 'ID do departamento associado',
    example: 1,
  })
  departamento_id: number;
}
