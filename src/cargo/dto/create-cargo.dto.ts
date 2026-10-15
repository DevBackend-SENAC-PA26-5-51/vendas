import { ApiProperty } from '@nestjs/swagger';

export class CreateCargoDto {
  @ApiProperty({
    description: 'Nome do cargo',
    example: 'Desenvolvedor',
    required: false,
  })
  nome?: string;
}
