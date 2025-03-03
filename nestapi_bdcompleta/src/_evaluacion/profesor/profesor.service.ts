import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor, 'base1')
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const { nif } = createProfesorDto;
    const existeNif = await this.profesorRepository.findOne({ where: { nif } });
    if (existeNif) {
      throw new ConflictException('El NIF ya está registrado.');
    }
    const profesor = this.profesorRepository.create(createProfesorDto);
    return await this.profesorRepository.save(profesor);
  }

  async findAll(): Promise<Profesor[]> {
    return await this.profesorRepository.find();
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado.`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
    const profesor = await this.findOne(id);
    if (updateProfesorDto.nif && updateProfesorDto.nif !== profesor.nif) {
      const existeNif = await this.profesorRepository.findOne({ where: { nif: updateProfesorDto.nif } });
      if (existeNif) {
        throw new ConflictException('El NIF ya está registrado.');
      }
    }
    Object.assign(profesor, updateProfesorDto);
    return await this.profesorRepository.save(profesor);
  }

  async remove(id: number): Promise<void> {
    const profesor = await this.findOne(id);
    await this.profesorRepository.remove(profesor);
  }
}
