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
import { FuncionariosService } from './funcionarios.service.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto.js';

@ApiTags('funcionarios')
@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo funcionário' })
  @ApiBody({ type: CreateFuncionarioDto })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.create(createFuncionarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários.' })
  findAll() {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: 1 })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: 1 })
  @ApiBody({ type: UpdateFuncionarioDto })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionariosService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário', example: 1 })
  @ApiResponse({ status: 200, description: 'Funcionário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(+id);
  }
}
