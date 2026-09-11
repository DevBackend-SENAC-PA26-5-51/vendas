import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

// O sistema não possui tabela própria de estoque.
// O estoque é controlado pelo campo `quantidade` do produto.
@Injectable()
export class EstoqueService {
  constructor(private prisma: PrismaService) {}

  // Registra uma movimentação: soma (entrada) ou subtrai (saída) a
  // quantidade informada do estoque atual do produto.
  async create(createEstoqueDto: CreateEstoqueDto) {
    const { produto_id, quantidade } = createEstoqueDto as any;

    // Validação: Produto e quantidade obrigatórios
    if (!produto_id) {
      throw new BadRequestException("O campo 'produto_id' é obrigatório.");
    }

    if (quantidade === undefined || quantidade === null) {
      throw new BadRequestException("O campo 'quantidade' é obrigatório.");
    }

    const produto = await this.prisma.produtos.findUnique({
      where: { id: produto_id },
    });

    if (!produto) {
      throw new NotFoundException(
        `Produto com ID ${produto_id} não encontrado.`,
      );
    }

    const estoqueAtual = produto.quantidade ?? 0;
    const novaQuantidade = estoqueAtual + quantidade;

    // Validação: Não permite estoque negativo
    if (novaQuantidade < 0) {
      throw new BadRequestException(
        `Estoque insuficiente. Atual: ${estoqueAtual}, movimentação: ${quantidade}.`,
      );
    }

    return this.prisma.produtos.update({
      where: { id: produto_id },
      data: { quantidade: novaQuantidade },
    });
  }

  // Lista a posição de estoque de todos os produtos.
  findAll() {
    return this.prisma.produtos.findMany({
      select: {
        id: true,
        nome: true,
        quantidade: true,
        tipo: true,
        preco: true,
      },
    });
  }

  // Busca a posição de estoque de um produto pelo ID.
  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({
      where: { id: id },
      select: {
        id: true,
        nome: true,
        quantidade: true,
        tipo: true,
        preco: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        `Movimentação/Produto com ID ${id} não encontrado.`,
      );
    }

    return produto;
  }

  // Define a quantidade absoluta em estoque do produto.
  async update(id: number, updateEstoqueDto: UpdateEstoqueDto) {
    await this.findOne(id);
    const { quantidade } = updateEstoqueDto as any;

    if (quantidade === undefined || quantidade === null) {
      throw new BadRequestException(
        "Informe a 'quantidade' absoluta do estoque.",
      );
    }

    if (quantidade < 0) {
      throw new BadRequestException('A quantidade não pode ser negativa.');
    }

    return this.prisma.produtos.update({
      where: { id: id },
      data: { quantidade: quantidade },
    });
  }

  // Zera o estoque do produto (não exclui o produto).
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.produtos.update({
      where: { id: id },
      data: { quantidade: 0 },
    });
  }
}
