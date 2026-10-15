import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FluxoCaixaService {
  constructor(private prisma: PrismaService) {}

  async create(createMovimentacaoDto: CreateMovimentacaoDto) {
    const { tipo, produto_id, quantidade, preco_unitario, descricao, venda_id } =
      createMovimentacaoDto as any;

    // Validações
    if (!tipo || !['entrada', 'saida'].includes(tipo.toLowerCase())) {
      throw new BadRequestException(
        "O campo 'tipo' é obrigatório e deve ser 'entrada' ou 'saida'.",
      );
    }

    if (!produto_id) {
      throw new BadRequestException("O campo 'produto_id' é obrigatório.");
    }

    if (quantidade === undefined || quantidade === null || quantidade <= 0) {
      throw new BadRequestException(
        "O campo 'quantidade' é obrigatório e deve ser maior que zero.",
      );
    }

    const produto = await this.prisma.produtos.findUnique({
      where: { id: produto_id },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${produto_id} não encontrado.`);
    }

    // Para saída, verifica se há estoque suficiente
    if (tipo.toLowerCase() === 'saida') {
      const estoqueAtual = produto.quantidade ?? 0;
      if (estoqueAtual < quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente. Atual: ${estoqueAtual}, solicitado: ${quantidade}.`,
        );
      }

      // Se for saída por venda, verifica se a venda existe
      if (venda_id) {
        const venda = await this.prisma.vendas.findUnique({
          where: { id: venda_id },
        });
        if (!venda) {
          throw new NotFoundException(`Venda com ID ${venda_id} não encontrada.`);
        }
      }
    }

    // Atualiza o estoque
    const estoqueAtual = produto.quantidade ?? 0;
    const novaQuantidade =
      tipo.toLowerCase() === 'entrada'
        ? estoqueAtual + quantidade
        : estoqueAtual - quantidade;

    await this.prisma.produtos.update({
      where: { id: produto_id },
      data: { quantidade: novaQuantidade },
    });

    // Registra a movimentação
    return this.prisma.movimentacoes.create({
      data: {
        tipo: tipo.toLowerCase(),
        produto_id,
        quantidade,
        preco_unitario: preco_unitario ?? produto.preco ?? null,
        descricao: descricao ?? null,
        venda_id: venda_id ?? null,
      },
    });
  }

  // Lista todas as movimentações recentes (entradas e saídas)
  findAll() {
    return this.prisma.movimentacoes.findMany({
      orderBy: { data: 'desc' },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            preco: true,
          },
        },
        vendas: {
          select: {
            id: true,
            id_status: true,
          },
        },
      },
    });
  }

  // Busca uma movimentação pelo ID
  async findOne(id: number) {
    const movimentacao = await this.prisma.movimentacoes.findUnique({
      where: { id: id },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            preco: true,
          },
        },
        vendas: {
          select: {
            id: true,
            id_status: true,
          },
        },
      },
    });

    if (!movimentacao) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada.`);
    }

    return movimentacao;
  }

  // Retorna o resumo do fluxo de caixa (totais de entradas e saídas)
  async getResumo() {
    const [totalEntradas, totalSaidas] = await Promise.all([
      this.prisma.movimentacoes.aggregate({
        _sum: { quantidade: true },
        where: { tipo: 'entrada' },
      }),
      this.prisma.movimentacoes.aggregate({
        _sum: { quantidade: true },
        where: { tipo: 'saida' },
      }),
    ]);

    const entradas = totalEntradas._sum.quantidade ?? 0;
    const saidas = totalSaidas._sum.quantidade ?? 0;

    return {
      totalEntradas: entradas,
      totalSaidas: saidas,
      saldo: entradas - saidas,
    };
  }
}
