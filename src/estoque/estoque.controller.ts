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
import { EstoqueService } from './estoque.service.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';

@ApiTags('estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar movimentação de estoque' })
  @ApiBody({ type: CreateEstoqueDto })
  @ApiResponse({ status: 201, description: 'Movimentação registrada.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createEstoqueDto: CreateEstoqueDto) {
    return this.estoqueService.create(createEstoqueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar movimentações de estoque' })
  @ApiResponse({ status: 200, description: 'Lista de movimentações.' })
  findAll() {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar movimentação pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da movimentação', example: 1 })
  @ApiResponse({ status: 200, description: 'Movimentação encontrada.' })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.estoqueService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar movimentação de estoque' })
  @ApiParam({ name: 'id', description: 'ID da movimentação', example: 1 })
  @ApiBody({ type: UpdateEstoqueDto })
  @ApiResponse({ status: 200, description: 'Movimentação atualizada.' })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada.' })
  update(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return this.estoqueService.update(+id, updateEstoqueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover movimentação de estoque' })
  @ApiParam({ name: 'id', description: 'ID da movimentação', example: 1 })
  @ApiResponse({ status: 200, description: 'Movimentação removida.' })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada.' })
  remove(@Param('id') id: string) {
    return this.estoqueService.remove(+id);
  }
}
