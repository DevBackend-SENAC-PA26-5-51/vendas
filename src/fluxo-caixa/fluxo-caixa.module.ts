import { Module } from '@nestjs/common';
import { FluxoCaixaService } from './fluxo-caixa.service.js';
import { FluxoCaixaController } from './fluxo-caixa.controller.js';

@Module({
  controllers: [FluxoCaixaController],
  providers: [FluxoCaixaService],
})
export class FluxoCaixaModule {}
