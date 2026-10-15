import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service.js';
import { FuncionariosController } from './funcionarios.controller.js';

@Module({
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class FuncionariosModule {}
