import { PartialType } from '@nestjs/swagger';
import { CreateVendaDto } from './create-venda.dto.js';

export class UpdateVendaDto extends PartialType(CreateVendaDto) {}
