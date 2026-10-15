import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const { ...produtoData } = createProdutoDto as any;

    // Validação: Nome obrigatório
    if (!produtoData.nome || produtoData.nome.trim() === '') {
      throw new BadRequestException("O campo 'nome' é obrigatório.");
    }

    return this.prisma.produtos.create({
      data: produtoData,
    });
  }

  findAll() {
    return this.prisma.produtos.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({
      where: {
        id: id,
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.findOne(id);
    const { ...produtoData } = updateProdutoDto as any;

    return this.prisma.produtos.update({
      where: {
        id: id,
      },
      data: produtoData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.produtos.delete({
      where: {
        id: id,
      },
    });
  }
}
