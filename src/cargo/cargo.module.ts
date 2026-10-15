import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service.js';
import { CargoController } from './cargo.controller.js';

@Module({
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {}
