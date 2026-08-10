import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service.js';
import { VendasController } from './vendas.controller.js';

@Module({
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
