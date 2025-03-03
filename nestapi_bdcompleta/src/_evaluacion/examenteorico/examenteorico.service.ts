import { Injectable, NotFoundException } from '@nestjs/common';
import { ExamenTeorico } from './entities/examenteorico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamenTeoricoDto } from './dto/create-examenteorico.dto';
import { UpdateExamenTeoricoDto } from './dto/update-examenteorico.dto';
import { Profesor } from '../profesor/entities/profesor.entity';

@Injectable()
export class ExamenteoricoService {
  constructor(
    @InjectRepository(ExamenTeorico, 'base1')
    private readonly examenTeoricoRepository: Repository<ExamenTeorico>,
    @InjectRepository(Profesor, 'base1')
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createDto: CreateExamenTeoricoDto): Promise<ExamenTeorico> {
    const { id_profesor, titulo, numero_preguntas, fecha } = createDto;

    const profesor = await this.profesorRepository.findOne({ where: { id: id_profesor } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id_profesor} no encontrado`);
    }

    const examenTeorico = this.examenTeoricoRepository.create({
      titulo,
      numero_preguntas,
      fecha,
      profesor,
    });

    return await this.examenTeoricoRepository.save(examenTeorico);
  }

  async findAll(): Promise<ExamenTeorico[]> {
    return await this.examenTeoricoRepository.find({ relations: ['profesor'] });
  }

  async findOne(id: number): Promise<ExamenTeorico> {
    const examenTeorico = await this.examenTeoricoRepository.findOne({ where: { id }, relations: ['profesor'] });
    if (!examenTeorico) {
      throw new NotFoundException(`Examen teórico con ID ${id} no encontrado`);
    }
    return examenTeorico;
  }

  async update(id: number, updateDto: UpdateExamenTeoricoDto): Promise<ExamenTeorico> {
    const examenTeorico = await this.findOne(id);

    if (updateDto.id_profesor) {
      const profesor = await this.profesorRepository.findOne({ where: { id: updateDto.id_profesor } });
      if (!profesor) {
        throw new NotFoundException(`Profesor con ID ${updateDto.id_profesor} no encontrado`);
      }
      examenTeorico.profesor = profesor;
    }

    Object.assign(examenTeorico, updateDto);

    return await this.examenTeoricoRepository.save(examenTeorico);
  }

  async remove(id: number): Promise<void> {
    const examenTeorico = await this.findOne(id);
    await this.examenTeoricoRepository.remove(examenTeorico);
  }
}
