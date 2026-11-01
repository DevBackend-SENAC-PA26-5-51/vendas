import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransportadoraService } from './transportadora.service.js';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto.js';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto.js';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('transportadora')
export class TransportadoraController {
  constructor(private readonly transportadoraService: TransportadoraService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma nova transportadora' })
  @ApiBody({ type: CreateTransportadoraDto })
  @ApiResponse({
    status: 201,
    description: 'Transportadora criada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTransportadoraDto: CreateTransportadoraDto) {
    return this.transportadoraService.create(createTransportadoraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos as tranportadoras' })
  @ApiResponse({ status: 200, description: 'Lista de tranportadoras.' })
  findAll() {
    return this.transportadoraService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma transportadora pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto', example: 1 })
  @ApiResponse({ status: 200, description: 'Produto encontrado.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.transportadoraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransportadoraDto: UpdateTransportadoraDto,
  ) {
    return this.transportadoraService.update(+id, updateTransportadoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportadoraService.remove(+id);
  }
}
