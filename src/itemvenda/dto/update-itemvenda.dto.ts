import { PartialType } from '@nestjs/swagger';
import { CreateItemVendaDto } from './create-itemvenda.dto.js';

export class UpdateItemVendaDto extends PartialType(CreateItemVendaDto) {}
