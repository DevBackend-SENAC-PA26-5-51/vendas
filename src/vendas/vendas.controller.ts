import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendasService } from './vendas.service.js';
import { CreateVendaDto } from './dto/create-venda.dto.js';
import { UpdateVendaDto } from './dto/update-venda.dto.js';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @Get()
  findAll() {
    return this.vendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendasService.remove(+id);
  }
}
