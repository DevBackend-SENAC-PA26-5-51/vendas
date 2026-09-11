import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto.js';
import { UpdateDashboardDto } from './dto/update-dashboard.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

// O sistema não possui tabela própria de dashboard.
// Os dados são gerados por leitura (agregação) dos demais módulos.
@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  create(_createDashboardDto: CreateDashboardDto) {
    throw new BadRequestException(
      'Dashboard é somente leitura. Use GET /dashboard.',
    );
  }

  // Retorna os indicadores principais + listas recentes para o dashboard.
  async findAll() {
    const [totalClientes, totalProdutos, totalVendas, totalPagamentos] =
      await Promise.all([
        this.prisma.cliente.count(),
        this.prisma.produtos.count(),
        this.prisma.vendas.count(),
        this.prisma.pagamentos.count(),
      ]);

    const valorTotal = await this.prisma.pagamentos.aggregate({
      _sum: { valo_pagamento: true },
    });

    const vendasRecentes = await this.prisma.vendas.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      include: { cliente: true, pagamentos: true },
    });

    const produtosBaixoEstoque = await this.prisma.produtos.findMany({
      where: { quantidade: { lt: 10 } },
      take: 5,
      select: { id: true, nome: true, quantidade: true, preco: true },
    });

    return {
      totalClientes,
      totalProdutos,
      totalVendas,
      totalPagamentos,
      valorTotalPagamentos: valorTotal._sum.valo_pagamento ?? 0,
      vendasRecentes,
      produtosBaixoEstoque,
    };
  }

  // Retorna o detalhe de uma venda para o dashboard.
  async findOne(id: number) {
    const venda = await this.prisma.vendas.findUnique({
      where: { id: id },
      include: { cliente: true, pagamentos: true },
    });

    if (!venda) {
      throw new NotFoundException(
        `Item do dashboard com ID ${id} não encontrado.`,
      );
    }

    return venda;
  }

  update(_id: number, _updateDashboardDto: UpdateDashboardDto) {
    throw new BadRequestException(
      'Dashboard é somente leitura e não pode ser atualizado.',
    );
  }

  remove(_id: number) {
    throw new BadRequestException(
      'Dashboard é somente leitura e não pode ser removido.',
    );
  }
}
