import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto.js';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TransportadoraService {
  constructor(private prisma: PrismaService) {}

  async create(createTransportadoraDto: CreateTransportadoraDto) {
    const { ...tranportadoraData } = createTransportadoraDto;

    if (!tranportadoraData.nome.trim()) {
      throw new BadRequestException(
        "O campo 'nome' da transportadora é obrigatório.",
      );
    }

    if (!tranportadoraData.contato.trim()) {
      throw new BadRequestException(
        "O campo 'contato' da transportadora é obrigatório.",
      );
    }

    return this.prisma.transportadoras.create({
      data: tranportadoraData,
    });
  }

  findAll() {
    return this.prisma.transportadoras.findMany();
  }

  async findOne(id: number) {
    const trans = await this.prisma.transportadoras.findUnique({
      where: {
        id: id,
      },
    });

    if (!trans) {
      throw new NotFoundException(
        `Transportadora com ID ${id} não encontrada.`,
      );
    }

    return trans;
  }

  async update(id: number, updateTransportadoraDto: UpdateTransportadoraDto) {
    await this.findOne(id);
    const { ...transportadoraData } =
      updateTransportadoraDto as CreateTransportadoraDto;

    return this.prisma.transportadoras.update({
      where: {
        id: id,
      },
      data: transportadoraData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.transportadoras.delete({
      where: {
        id: id,
      },
    });
  }
}
