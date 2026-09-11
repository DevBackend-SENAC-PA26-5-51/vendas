import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service.js';
import { CreateRelatorioDto } from './dto/create-relatorio.dto.js';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto.js';

@ApiTags('relatorios')
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Post()
  @ApiOperation({ summary: 'Gerar um novo relatório' })
  @ApiResponse({ status: 201, description: 'Relatório gerado com sucesso.' })
  create(@Body() createRelatorioDto: CreateRelatorioDto) {
    return this.relatoriosService.create(createRelatorioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar relatórios' })
  @ApiResponse({ status: 200, description: 'Lista de relatórios.' })
  findAll() {
    return this.relatoriosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar relatório pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do relatório', example: 1 })
  @ApiResponse({ status: 200, description: 'Relatório encontrado.' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.relatoriosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um relatório' })
  @ApiParam({ name: 'id', description: 'ID do relatório', example: 1 })
  @ApiResponse({ status: 200, description: 'Relatório atualizado.' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateRelatorioDto: UpdateRelatorioDto,
  ) {
    return this.relatoriosService.update(+id, updateRelatorioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um relatório' })
  @ApiParam({ name: 'id', description: 'ID do relatório', example: 1 })
  @ApiResponse({ status: 200, description: 'Relatório removido.' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado.' })
  remove(@Param('id') id: string) {
    return this.relatoriosService.remove(+id);
  }
}
