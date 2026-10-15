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
import { CargoService } from './cargo.service.js';
import { CreateCargoDto } from './dto/create-cargo.dto.js';
import { UpdateCargoDto } from './dto/update-cargo.dto.js';

@ApiTags('cargo')
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo cargo' })
  @ApiBody({ type: CreateCargoDto })
  @ApiResponse({ status: 201, description: 'Cargo criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cargos' })
  @ApiResponse({ status: 200, description: 'Lista de cargos.' })
  findAll() {
    return this.cargoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um cargo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do cargo', example: 1 })
  @ApiResponse({ status: 200, description: 'Cargo encontrado.' })
  @ApiResponse({ status: 404, description: 'Cargo não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.cargoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um cargo' })
  @ApiParam({ name: 'id', description: 'ID do cargo', example: 1 })
  @ApiBody({ type: UpdateCargoDto })
  @ApiResponse({ status: 200, description: 'Cargo atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cargo não encontrado.' })
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(+id, updateCargoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cargo' })
  @ApiParam({ name: 'id', description: 'ID do cargo', example: 1 })
  @ApiResponse({ status: 200, description: 'Cargo removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cargo não encontrado.' })
  remove(@Param('id') id: string) {
    return this.cargoService.remove(+id);
  }
}
