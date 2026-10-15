import { Module } from '@nestjs/common';
import { ItemVendaService } from './itemvenda.service.js';
import { ItemVendaController } from './itemvenda.controller.js';

@Module({
  controllers: [ItemVendaController],
  providers: [ItemVendaService],
})
export class ItemVendaModule {}
