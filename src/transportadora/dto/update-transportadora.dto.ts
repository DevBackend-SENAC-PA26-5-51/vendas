import { PartialType } from '@nestjs/swagger';
import { CreateTransportadoraDto } from './create-transportadora.dto.js';

export class UpdateTransportadoraDto extends PartialType(
  CreateTransportadoraDto,
) {}
