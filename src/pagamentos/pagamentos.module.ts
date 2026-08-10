import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service.js';
import { PagamentosController } from './pagamentos.controller.js';

@Module({
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}
