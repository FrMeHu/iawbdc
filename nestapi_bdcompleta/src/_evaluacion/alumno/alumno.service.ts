import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno, 'base1')
    private readonly alumnoRepository: Repository<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const { nif } = createAlumnoDto;
    const exists = await this.alumnoRepository.findOne({ where: { nif } });
    if (exists) {
      throw new ConflictException(`El NIF ${nif} ya está registrado.`);
    }

    const alumno = this.alumnoRepository.create(createAlumnoDto);
    return await this.alumnoRepository.save(alumno);
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumno> {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado.`);
    }
    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const alumno = await this.findOne(id);

    if (updateAlumnoDto.nif && updateAlumnoDto.nif !== alumno.nif) {
      const exists = await this.alumnoRepository.findOne({ where: { nif: updateAlumnoDto.nif } });
      if (exists) {
        throw new ConflictException(`El NIF ${updateAlumnoDto.nif} ya está registrado.`);
      }
    }

    Object.assign(alumno, updateAlumnoDto);

    return await this.alumnoRepository.save(alumno);
  }

  async remove(id: number): Promise<void> {
    const alumno = await this.findOne(id);
    await this.alumnoRepository.remove(alumno);
  }
}
