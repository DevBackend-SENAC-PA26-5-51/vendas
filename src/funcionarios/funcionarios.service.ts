import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const { ...funcionarioData } = createFuncionarioDto as any;

    // Validação: endereco_id obrigatório
    if (!funcionarioData.endereco_id) {
      throw new BadRequestException("O campo 'endereco_id' é obrigatório.");
    }

    // Validação: cargo_id obrigatório
    if (!funcionarioData.cargo_id) {
      throw new BadRequestException("O campo 'cargo_id' é obrigatório.");
    }

    // Validação: departamento_id obrigatório
    if (!funcionarioData.departamento_id) {
      throw new BadRequestException("O campo 'departamento_id' é obrigatório.");
    }

    return this.prisma.funcionarios.create({
      data: funcionarioData,
    });
  }

  findAll() {
    return this.prisma.funcionarios.findMany();
  }

  async findOne(id: number) {
    const funcionario = await this.prisma.funcionarios.findUnique({
      where: {
        id: id,
      },
    });

    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }

    return funcionario;
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    await this.findOne(id);
    const { ...funcionarioData } = updateFuncionarioDto as any;

    return this.prisma.funcionarios.update({
      where: {
        id: id,
      },
      data: funcionarioData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.funcionarios.delete({
      where: {
        id: id,
      },
    });
  }
}
