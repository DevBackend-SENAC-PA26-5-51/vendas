import { Module } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service.js';
import { TransportadoraController } from './transportadora.controller.js';

@Module({
  controllers: [TransportadoraController],
  providers: [TransportadoraService],
})
export class TransportadoraModule {}
