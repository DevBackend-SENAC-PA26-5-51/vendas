import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateItemVendaDto } from './dto/create-itemvenda.dto.js';
import { UpdateItemVendaDto } from './dto/update-itemvenda.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ItemVendaService {
  constructor(private prisma: PrismaService) {}

  async create(createItemVendaDto: CreateItemVendaDto) {
    const { ...itemVendaData } = createItemVendaDto as any;

    // Validação: vendas_id obrigatório
    if (!itemVendaData.vendas_id) {
      throw new BadRequestException("O campo 'vendas_id' é obrigatório.");
    }

    // Validação: produtos_id obrigatório
    if (!itemVendaData.produtos_id) {
      throw new BadRequestException("O campo 'produtos_id' é obrigatório.");
    }

    return this.prisma.itemvenda.create({
      data: itemVendaData,
    });
  }

  findAll() {
    return this.prisma.itemvenda.findMany();
  }

  async findOne(id: number) {
    const itemVenda = await this.prisma.itemvenda.findUnique({
      where: {
        id: id,
      },
    });

    if (!itemVenda) {
      throw new NotFoundException(`Item de Venda com ID ${id} não encontrado.`);
    }

    return itemVenda;
  }

  async update(id: number, updateItemVendaDto: UpdateItemVendaDto) {
    await this.findOne(id);
    const { ...itemVendaData } = updateItemVendaDto as any;

    return this.prisma.itemvenda.update({
      where: {
        id: id,
      },
      data: itemVendaData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.itemvenda.delete({
      where: {
        id: id,
      },
    });
  }
}
