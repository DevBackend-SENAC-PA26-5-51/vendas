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
import { PagamentosService } from './pagamentos.service.js';
import { CreatePagamentoDto } from './dto/create-pagamento.dto.js';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto.js';

@ApiTags('pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo pagamento' })
  @ApiBody({ type: CreatePagamentoDto })
  @ApiResponse({ status: 201, description: 'Pagamento registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pagamentos' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos.' })
  findAll() {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pagamento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', example: 1 })
  @ApiResponse({ status: 200, description: 'Pagamento encontrado.' })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.pagamentosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um pagamento' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', example: 1 })
  @ApiBody({ type: UpdatePagamentoDto })
  @ApiResponse({ status: 200, description: 'Pagamento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentosService.update(+id, updatePagamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pagamento' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', example: 1 })
  @ApiResponse({ status: 200, description: 'Pagamento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(+id);
  }
}
