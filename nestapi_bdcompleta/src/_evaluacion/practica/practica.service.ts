import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Practica } from './entities/practica.entity';
import { Repository } from 'typeorm';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';

@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica, 'base1')
    private readonly practicaRepository: Repository<Practica>,
  ) {}

  async create(createPracticaDto: CreatePracticaDto): Promise<Practica> {
    const practica = this.practicaRepository.create(createPracticaDto);
    return this.practicaRepository.save(practica);
  }

  async findAll(): Promise<Practica[]> {
    return this.practicaRepository.find();
  }

  async findOne(id: number): Promise<Practica> {
    const practica = await this.practicaRepository.findOne({ where: { id } });
    if (!practica) {
      throw new NotFoundException(`Práctica con ID ${id} no encontrada`);
    }
    return practica;
  }
  

  async update(id: number, updatePracticaDto: UpdatePracticaDto): Promise<Practica> {
    await this.practicaRepository.update(id, updatePracticaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const practica = await this.findOne(id);
    await this.practicaRepository.remove(practica);
  }
}
