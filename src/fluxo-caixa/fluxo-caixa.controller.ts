import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FluxoCaixaService } from './fluxo-caixa.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';

@ApiTags('fluxo-caixa')
@Controller('fluxo-caixa')
export class FluxoCaixaController {
  constructor(private readonly fluxoCaixaService: FluxoCaixaService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar movimentação de estoque (entrada ou saída)' })
  @ApiBody({ type: CreateMovimentacaoDto })
  @ApiResponse({ status: 201, description: 'Movimentação registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createMovimentacaoDto: CreateMovimentacaoDto) {
    return this.fluxoCaixaService.create(createMovimentacaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as movimentações recentes' })
  @ApiResponse({ status: 200, description: 'Lista de movimentações.' })
  findAll() {
    return this.fluxoCaixaService.findAll();
  }

  @Get('resumo')
  @ApiOperation({ summary: 'Resumo do fluxo de caixa (entradas, saídas e saldo)' })
  @ApiResponse({ status: 200, description: 'Resumo do fluxo de caixa.' })
  getResumo() {
    return this.fluxoCaixaService.getResumo();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar movimentação pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da movimentação', example: 1 })
  @ApiResponse({ status: 200, description: 'Movimentação encontrada.' })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.fluxoCaixaService.findOne(+id);
  }
}
