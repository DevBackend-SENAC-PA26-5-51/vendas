import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto.js';
import { UpdateCargoDto } from './dto/update-cargo.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoDto: CreateCargoDto) {
    const { ...cargoData } = createCargoDto as any;

    // Validação: nome obrigatório
    if (!cargoData.nome || cargoData.nome.trim() === '') {
      throw new BadRequestException("O campo 'nome' é obrigatório.");
    }

    return this.prisma.cargo.create({
      data: cargoData,
    });
  }

  findAll() {
    return this.prisma.cargo.findMany();
  }

  async findOne(id: number) {
    const cargo = await this.prisma.cargo.findUnique({
      where: {
        id: id,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`Cargo com ID ${id} não encontrado.`);
    }

    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto) {
    await this.findOne(id);
    const { ...cargoData } = updateCargoDto as any;

    return this.prisma.cargo.update({
      where: {
        id: id,
      },
      data: cargoData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cargo.delete({
      where: {
        id: id,
      },
    });
  }
}
