import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumnoRealizaPractica } from './entities/alumnorealizapractica.entity';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Practica } from '../practica/entities/practica.entity';
import { CreateAlumnoRealizaPracticaDto } from './dto/create-alumnorealizapractica.dto';
import { UpdateAlumnorealizapracticaDto } from './dto/update-alumnorealizapractica.dto';

@Injectable()
export class AlumnoRealizaPracticaService {
  constructor(
    @InjectRepository(AlumnoRealizaPractica, 'base1')
    private readonly arpRepository: Repository<AlumnoRealizaPractica>,
    @InjectRepository(Alumno, 'base1')
    private readonly alumnoRepository: Repository<Alumno>,
    @InjectRepository(Practica, 'base1')
    private readonly practicaRepository: Repository<Practica>,
  ) {}

  async create(createDto: CreateAlumnoRealizaPracticaDto): Promise<AlumnoRealizaPractica> {
    const { id_alumno, id_practica, fecha, nota } = createDto;

    const alumno = await this.alumnoRepository.findOne({ where: { id: id_alumno } });
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id_alumno} no encontrado`);
    }

    const practica = await this.practicaRepository.findOne({ where: { id: id_practica } });
    if (!practica) {
      throw new NotFoundException(`Práctica con ID ${id_practica} no encontrada`);
    }

    const existRegistro = await this.arpRepository.findOne({ where: { id_alumno, id_practica } });
    if (existRegistro) {
      throw new ConflictException(`El alumno con ID ${id_alumno} ya ha realizado la práctica con ID ${id_practica}`);
    }

    const arp = this.arpRepository.create({
      id_alumno,
      id_practica,
      fecha,
      nota,
      alumno,
      practica,
    });

    return await this.arpRepository.save(arp);
  }

  async findOne(id_alumno: number, id_practica: number): Promise<AlumnoRealizaPractica> {
    const registro = await this.arpRepository.findOne({ where: { id_alumno, id_practica } });
    if (!registro) {
      throw new NotFoundException(`No se encontró registro para el alumno con ID ${id_alumno} y práctica con ID ${id_practica}`);
    }
    return registro;
  }

  async remove(id_alumno: number, id_practica: number) {
    return this.arpRepository.delete({ id_alumno, id_practica });
  }  

  async update(
    id_alumno: number,
    id_practica: number,
    updateDto: UpdateAlumnorealizapracticaDto,
  ): Promise<AlumnoRealizaPractica> {
    const registro = await this.arpRepository.findOne({ where: { id_alumno, id_practica } });

    if (!registro) {
      throw new NotFoundException(
        `No se encontró registro para el alumno con ID ${id_alumno} y práctica con ID ${id_practica}`,
      );
    }

    // Actualizar los campos que se proporcionen
    if (updateDto.fecha !== undefined) {
      registro.fecha = updateDto.fecha;
    }

    if (updateDto.nota !== undefined) {
      registro.nota = updateDto.nota;
    }

    return await this.arpRepository.save(registro);
  }

  async findAll(): Promise<AlumnoRealizaPractica[]> {
    return await this.arpRepository.find({
      relations: ['alumno', 'practica'],
    });
  }

}
  
