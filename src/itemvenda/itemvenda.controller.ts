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
import { ItemVendaService } from './itemvenda.service.js';
import { CreateItemVendaDto } from './dto/create-itemvenda.dto.js';
import { UpdateItemVendaDto } from './dto/update-itemvenda.dto.js';

@ApiTags('itemvenda')
@Controller('itemvenda')
export class ItemVendaController {
  constructor(private readonly itemVendaService: ItemVendaService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo item de venda' })
  @ApiBody({ type: CreateItemVendaDto })
  @ApiResponse({ status: 201, description: 'Item de venda criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createItemVendaDto: CreateItemVendaDto) {
    return this.itemVendaService.create(createItemVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens de venda' })
  @ApiResponse({ status: 200, description: 'Lista de itens de venda.' })
  findAll() {
    return this.itemVendaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um item de venda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do item de venda', example: 1 })
  @ApiResponse({ status: 200, description: 'Item de venda encontrado.' })
  @ApiResponse({ status: 404, description: 'Item de venda não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.itemVendaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um item de venda' })
  @ApiParam({ name: 'id', description: 'ID do item de venda', example: 1 })
  @ApiBody({ type: UpdateItemVendaDto })
  @ApiResponse({ status: 200, description: 'Item de venda atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item de venda não encontrado.' })
  update(@Param('id') id: string, @Body() updateItemVendaDto: UpdateItemVendaDto) {
    return this.itemVendaService.update(+id, updateItemVendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um item de venda' })
  @ApiParam({ name: 'id', description: 'ID do item de venda', example: 1 })
  @ApiResponse({ status: 200, description: 'Item de venda removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item de venda não encontrado.' })
  remove(@Param('id') id: string) {
    return this.itemVendaService.remove(+id);
  }
}
