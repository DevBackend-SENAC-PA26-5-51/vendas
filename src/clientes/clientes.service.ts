import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    const { vendas, ...clienteData } = createClienteDto as any;

    // Validação: Nome obrigatório
    if (!clienteData.nome || clienteData.nome.trim() === '') {
      throw new BadRequestException("O campo 'nome' é obrigatório.");
    }

    // Validação: CPF obrigatório
    if (!clienteData.cpf || clienteData.cpf.trim() === '') {
      throw new BadRequestException("O campo 'cpf' é obrigatório.");
    }

    // Validação: Verificar se já existe um cliente com o mesmo CPF
    if (clienteData.cpf) {
      const clienteExistente = await this.prisma.cliente.findFirst({
        where: { cpf: clienteData.cpf },
      });

      if (clienteExistente) {
        throw new ConflictException(`Já existe um cliente cadastrado com o CPF ${clienteData.cpf}.`);
      }
    }

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
  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const { vendas, ...clienteData } = updateClienteDto as any;

    // Validação: Se atualizar o CPF, garantir que ele não pertença a outro cliente
    if (clienteData.cpf) {
      const clienteExistente = await this.prisma.cliente.findFirst({
        where: { 
          cpf: clienteData.cpf,
          NOT: { id: id } 
        },
      });

      if (clienteExistente) {
        throw new ConflictException(`Já existe outro cliente cadastrado com o CPF ${clienteData.cpf}.`);
      }
    }

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
