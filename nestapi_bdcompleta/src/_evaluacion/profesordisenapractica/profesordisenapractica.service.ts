import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ProfesorDisenaPractica } from './entities/profesordisenapractica.entity';
import { Repository } from 'typeorm';
import { Profesor } from '../profesor/entities/profesor.entity';
import { Practica } from '../practica/entities/practica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesorDisenaPracticaDto } from './dto/create-profesordisenapractica.dto';
import { UpdateProfesorDisenaPracticaDto } from './dto/update-profesordisenapractica.dto';

@Injectable()
export class ProfesorDisenaPracticaService {
  constructor(
    @InjectRepository(ProfesorDisenaPractica, 'base1')
    private readonly pdpRepository: Repository<ProfesorDisenaPractica>,
    @InjectRepository(Profesor, 'base1')
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Practica, 'base1')
    private readonly practicaRepository: Repository<Practica>,
  ) {}

  async create(createDto: CreateProfesorDisenaPracticaDto): Promise<ProfesorDisenaPractica> {
    const { id_profesor, id_practica, fecha } = createDto;

    const profesor = await this.profesorRepository.findOne({ where: { id: id_profesor } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id_profesor} no encontrado`);
    }

    const practica = await this.practicaRepository.findOne({ where: { id: id_practica } });
    if (!practica) {
      throw new NotFoundException(`Práctica con ID ${id_practica} no encontrada`);
    }

    const exists = await this.pdpRepository.findOne({ where: { id_profesor, id_practica } });
    if (exists) {
      throw new ConflictException(`El profesor con ID ${id_profesor} ya ha diseñado la práctica con ID ${id_practica}`);
    }

    const pdp = this.pdpRepository.create({
      id_profesor,
      id_practica,
      fecha,
      profesor,
      practica,
    });

    return await this.pdpRepository.save(pdp);
  }

  async findOne(id_profesor: number, id_practica: number): Promise<ProfesorDisenaPractica> {
    const registro = await this.pdpRepository.findOne({
      where: { id_profesor, id_practica },
      relations: ['profesor', 'practica'],
    });

    if (!registro) {
      throw new NotFoundException(
        `No se encontró registro para el profesor con ID ${id_profesor} y práctica con ID ${id_practica}`,
      );
    }

    return registro;
  }

  async remove(id_profesor: number, id_practica: number): Promise<void> {
    const result = await this.pdpRepository.delete({ id_profesor, id_practica });
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró registro para el profesor con ID ${id_profesor} y práctica con ID ${id_practica}`,
      );
    }
  }

  async findAll(): Promise<ProfesorDisenaPractica[]> {
    return await this.pdpRepository.find({
      relations: ['profesor', 'practica'],
    });
  }

  async update(
    id_profesor: number,
    id_practica: number,
    updateDto: UpdateProfesorDisenaPracticaDto,
  ): Promise<ProfesorDisenaPractica> {
    const registro = await this.pdpRepository.findOne({ where: { id_profesor, id_practica } });

    if (!registro) {
      throw new NotFoundException(
        `No se encontró el registro para el profesor con ID ${id_profesor} y práctica con ID ${id_practica}.`,
      );
    }

    if (updateDto.fecha !== undefined) {
      registro.fecha = updateDto.fecha;
    }

    return await this.pdpRepository.save(registro);
  }

}
