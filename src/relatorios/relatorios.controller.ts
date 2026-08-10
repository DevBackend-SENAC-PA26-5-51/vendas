import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service.js';
import { CreateRelatorioDto } from './dto/create-relatorio.dto.js';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto.js';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Post()
  create(@Body() createRelatorioDto: CreateRelatorioDto) {
    return this.relatoriosService.create(createRelatorioDto);
  }

  @Get()
  findAll() {
    return this.relatoriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relatoriosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelatorioDto: UpdateRelatorioDto) {
    return this.relatoriosService.update(+id, updateRelatorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relatoriosService.remove(+id);
  }
}
