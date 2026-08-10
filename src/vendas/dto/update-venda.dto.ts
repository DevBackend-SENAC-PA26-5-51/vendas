import { PartialType } from '@nestjs/mapped-types';
import { CreateVendaDto } from './create-venda.dto.js';

export class UpdateVendaDto extends PartialType(CreateVendaDto) {}
