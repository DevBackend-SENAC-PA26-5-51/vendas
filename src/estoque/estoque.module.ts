import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service.js';
import { EstoqueController } from './estoque.controller.js';

@Module({
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
