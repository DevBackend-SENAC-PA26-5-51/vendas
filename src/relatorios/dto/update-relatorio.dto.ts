import { PartialType } from '@nestjs/swagger';
import { CreateRelatorioDto } from './create-relatorio.dto.js';

export class UpdateRelatorioDto extends PartialType(CreateRelatorioDto) {}
