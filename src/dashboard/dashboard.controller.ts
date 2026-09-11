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
import { DashboardService } from './dashboard.service.js';
import { CreateDashboardDto } from './dto/create-dashboard.dto.js';
import { UpdateDashboardDto } from './dto/update-dashboard.dto.js';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @ApiOperation({ summary: 'Criar item de dashboard' })
  @ApiResponse({ status: 201, description: 'Item criado com sucesso.' })
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter dados do dashboard' })
  @ApiResponse({ status: 200, description: 'Dados do dashboard.' })
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item do dashboard pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do item', example: 1 })
  @ApiResponse({ status: 200, description: 'Item encontrado.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar item do dashboard' })
  @ApiParam({ name: 'id', description: 'ID do item', example: 1 })
  @ApiResponse({ status: 200, description: 'Item atualizado.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item do dashboard' })
  @ApiParam({ name: 'id', description: 'ID do item', example: 1 })
  @ApiResponse({ status: 200, description: 'Item removido.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
