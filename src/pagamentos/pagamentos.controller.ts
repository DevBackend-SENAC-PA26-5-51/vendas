import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service.js';
import { CreatePagamentoDto } from './dto/create-pagamento.dto.js';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto.js';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Get()
  findAll() {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentosService.update(+id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(+id);
  }
}
