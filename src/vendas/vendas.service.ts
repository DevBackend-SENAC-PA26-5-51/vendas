import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto.js';
import { UpdateVendaDto } from './dto/update-venda.dto.js';

@Injectable()
export class VendasService {
  create(createVendaDto: CreateVendaDto) {
    return 'This action adds a new venda';
  }

  findAll() {
    return `This action returns all vendas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
