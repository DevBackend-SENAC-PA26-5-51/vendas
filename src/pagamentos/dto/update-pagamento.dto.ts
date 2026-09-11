import { PartialType } from '@nestjs/swagger';
import { CreatePagamentoDto } from './create-pagamento.dto.js';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {}
