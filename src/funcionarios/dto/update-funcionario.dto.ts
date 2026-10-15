import { PartialType } from '@nestjs/swagger';
import { CreateFuncionarioDto } from './create-funcionario.dto.js';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {}
