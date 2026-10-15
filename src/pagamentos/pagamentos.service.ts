import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto.js';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PagamentosService {
  constructor(private prisma: PrismaService) {}

  async create(createPagamentoDto: CreatePagamentoDto) {
    const { data_pagamento, ...pagamentoData } =
      createPagamentoDto as any;

    // Validação: Venda relacionada obrigatória
    if (!pagamentoData.vendas_id) {
      throw new BadRequestException("O campo 'vendas_id' é obrigatório.");
    }

    // Validação: Verificar se a venda existe
    const venda = await this.prisma.vendas.findUnique({
      where: { id: pagamentoData.vendas_id },
    });

    if (!venda) {
      throw new NotFoundException(
        `Venda com ID ${pagamentoData.vendas_id} não encontrada.`,
      );
    }

    return this.prisma.pagamentos.create({
      data: {
        ...pagamentoData,
        data_pagamento: data_pagamento
          ? new Date(data_pagamento)
          : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.pagamentos.findMany();
  }

  async findOne(id: number) {
    const pagamento = await this.prisma.pagamentos.findUnique({
      where: {
        id: id,
      },
    });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado.`);
    }

    return pagamento;
  }

  async update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    await this.findOne(id);
    const { data_pagamento, ...pagamentoData } =
      updatePagamentoDto as any;

    // Validação: Se atualizar a venda, garantir que ela exista
    if (pagamentoData.vendas_id) {
      const venda = await this.prisma.vendas.findUnique({
        where: { id: pagamentoData.vendas_id },
      });

      if (!venda) {
        throw new NotFoundException(
          `Venda com ID ${pagamentoData.vendas_id} não encontrada.`,
        );
      }
    }

    return this.prisma.pagamentos.update({
      where: {
        id: id,
      },
      data: {
        ...pagamentoData,
        ...(data_pagamento !== undefined
          ? { data_pagamento: new Date(data_pagamento) }
          : {}),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pagamentos.delete({
      where: {
        id: id,
      },
    });
  }
}
