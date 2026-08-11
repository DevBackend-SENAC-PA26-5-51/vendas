import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  create(createClienteDto: CreateClienteDto) {
    const { vendas, ...clienteData } = createClienteDto as any;

    return this.prisma.cliente.create({
      data: clienteData,
    });
  }

  findAll() {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: id,
      },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return cliente;
  }

    async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);
    const { vendas, ...clienteData } = updateClienteDto as any;

    return this.prisma.cliente.update({
      where: {
        id: id,
      },
      data: clienteData,
    });
  }

   async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cliente.delete({
      where: {
        id: id,
      },
    });
  }
}
