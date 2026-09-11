import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateRelatorioDto } from './dto/create-relatorio.dto.js';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

// O sistema não possui tabela própria de relatórios.
// Os relatórios são gerados por leitura (agregação) dos demais módulos.
@Injectable()
export class RelatoriosService {
  constructor(private prisma: PrismaService) {}

  create(_createRelatorioDto: CreateRelatorioDto) {
    throw new BadRequestException(
      'Relatórios são somente leitura e gerados automaticamente. Use GET /relatorios.',
    );
  }

  // Retorna o resumo geral: totais de clientes, produtos, vendas,
  // pagamentos e valor total recebido.
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

    return {
      totalClientes,
      totalProdutos,
      totalVendas,
      totalPagamentos,
      valorTotalPagamentos: valorTotal._sum.valo_pagamento ?? 0,
    };
  }

  // Retorna o relatório detalhado de uma venda pelo ID.
  async findOne(id: number) {
    const venda = await this.prisma.vendas.findUnique({
      where: { id: id },
      include: {
        cliente: true,
        funcionarios: true,
        transportadoras: true,
        pagamentos: true,
        itemvenda: { include: { produtos: true } },
      },
    });

    if (!venda) {
      throw new NotFoundException(`Relatório da venda ${id} não encontrado.`);
    }

    return venda;
  }

  update(_id: number, _updateRelatorioDto: UpdateRelatorioDto) {
    throw new BadRequestException(
      'Relatórios são somente leitura e não podem ser atualizados.',
    );
  }

  remove(_id: number) {
    throw new BadRequestException(
      'Relatórios são somente leitura e não podem ser removidos.',
    );
  }
}
