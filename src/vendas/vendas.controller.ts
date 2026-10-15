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
  ApiBody,
} from '@nestjs/swagger';
import { VendasService } from './vendas.service.js';
import { CreateVendaDto } from './dto/create-venda.dto.js';
import { UpdateVendaDto } from './dto/update-venda.dto.js';

@ApiTags('vendas')
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar uma nova venda' })
  @ApiBody({ type: CreateVendaDto })
  @ApiResponse({ status: 201, description: 'Venda registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as vendas' })
  @ApiResponse({ status: 200, description: 'Lista de vendas.' })
  findAll() {
    return this.vendasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma venda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da venda', example: 1 })
  @ApiResponse({ status: 200, description: 'Venda encontrada.' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.vendasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma venda' })
  @ApiParam({ name: 'id', description: 'ID da venda', example: 1 })
  @ApiBody({ type: UpdateVendaDto })
  @ApiResponse({ status: 200, description: 'Venda atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada.' })
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma venda' })
  @ApiParam({ name: 'id', description: 'ID da venda', example: 1 })
  @ApiResponse({ status: 200, description: 'Venda removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada.' })
  remove(@Param('id') id: string) {
    return this.vendasService.remove(+id);
  }
}
