import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto.js';
import { UpdateVendaDto } from './dto/update-venda.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto) {
    const { ...vendaData } = createVendaDto;

    // Validação: FKs obrigatórias
    if (!vendaData.cliente_id) {
      throw new BadRequestException("O campo 'cliente_id' é obrigatório.");
    }

    if (!vendaData.transportadoras_id) {
      throw new BadRequestException(
        "O campo 'transportadoras_id' é obrigatório.",
      );
    }

    if (!vendaData.funcionarios_id) {
      throw new BadRequestException("O campo 'funcionarios_id' é obrigatório.");
    }

    // Validação: Verificar se as FKs existem
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: vendaData.cliente_id },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${vendaData.cliente_id} não encontrado.`,
      );
    }

    const transportadora = await this.prisma.transportadoras.findUnique({
      where: { id: vendaData.transportadoras_id },
    });

    if (!transportadora) {
      throw new NotFoundException(
        `Transportadora com ID ${vendaData.transportadoras_id} não encontrada.`,
      );
    }

    const funcionario = await this.prisma.funcionarios.findUnique({
      where: { id: vendaData.funcionarios_id },
    });

    if (!funcionario) {
      throw new NotFoundException(
        `Funcionário com ID ${vendaData.funcionarios_id} não encontrado.`,
      );
    }

    return this.prisma.vendas.create({
      data: vendaData,
    });
  }

  findAll() {
    return this.prisma.vendas.findMany();
  }

  async findOne(id: number) {
    const venda = await this.prisma.vendas.findUnique({
      where: {
        id: id,
      },
    });

    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
    }

    return venda;
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    await this.findOne(id);
    const { ...vendaData } = updateVendaDto as any;

    // Validação: Se atualizar as FKs, garantir que existam
    if (vendaData.cliente_id) {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id: vendaData.cliente_id },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente com ID ${vendaData.cliente_id} não encontrado.`,
        );
      }
    }

    if (vendaData.transportadoras_id) {
      const transportadora = await this.prisma.transportadoras.findUnique({
        where: { id: vendaData.transportadoras_id },
      });

      if (!transportadora) {
        throw new NotFoundException(
          `Transportadora com ID ${vendaData.transportadoras_id} não encontrada.`,
        );
      }
    }

    if (vendaData.funcionarios_id) {
      const funcionario = await this.prisma.funcionarios.findUnique({
        where: { id: vendaData.funcionarios_id },
      });

      if (!funcionario) {
        throw new NotFoundException(
          `Funcionário com ID ${vendaData.funcionarios_id} não encontrado.`,
        );
      }
    }

    return this.prisma.vendas.update({
      where: {
        id: id,
      },
      data: vendaData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.vendas.delete({
      where: {
        id: id,
      },
    });
  }
}
