import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AlumnoHaceExamenTeorico } from './entities/alumnohaceexaman.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlumnoHaceExamenDto } from './dto/create-alumnohaceexaman.dto';
import { Alumno } from '../alumno/entities/alumno.entity';
import { ExamenTeorico } from '../examenteorico/entities/examenteorico.entity';
import { UpdateAlumnoHaceExamenDto } from './dto/update-alumnohaceexaman.dto';

@Injectable()
export class AlumnoHaceExamenService {
  constructor(
    @InjectRepository(AlumnoHaceExamenTeorico, 'base1')
    private readonly aheRepository: Repository<AlumnoHaceExamenTeorico>,
    @InjectRepository(Alumno, 'base1')
    private readonly alumnoRepository: Repository<Alumno>,
    @InjectRepository(ExamenTeorico, 'base1')
    private readonly examenRepository: Repository<ExamenTeorico>,
  ) {}

  async create(createDto: CreateAlumnoHaceExamenDto): Promise<AlumnoHaceExamenTeorico> {
    const { id_alumno, id_examen, nota } = createDto;

    const alumno = await this.alumnoRepository.findOne({ where: { id: id_alumno } });
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id_alumno} no encontrado.`);
    }

    const examen = await this.examenRepository.findOne({ where: { id: id_examen } });
    if (!examen) {
      throw new NotFoundException(`Examen teórico con ID ${id_examen} no encontrado.`);
    }

    const exists = await this.aheRepository.findOne({ where: { id_alumno, id_examen } });
    if (exists) {
      throw new ConflictException(
        `El alumno con ID ${id_alumno} ya ha realizado el examen con ID ${id_examen}.`,
      );
    }

    const ahe = this.aheRepository.create({
      id_alumno,
      id_examen,
      nota,
      alumno,
      examenTeorico: examen,
    });

    return await this.aheRepository.save(ahe);
  }

  async findOne(id_alumno: number, id_examen: number): Promise<AlumnoHaceExamenTeorico> {
    const registro = await this.aheRepository.findOne({
      where: { id_alumno, id_examen },
      relations: ['alumno', 'examenTeorico'],
    });

    if (!registro) {
      throw new NotFoundException(
        `No se encontró registro para el alumno con ID ${id_alumno} y examen con ID ${id_examen}.`,
      );
    }

    return registro;
  }

  async update(
    id_alumno: number,
    id_examen: number,
    updateDto: UpdateAlumnoHaceExamenDto,
  ): Promise<AlumnoHaceExamenTeorico> {
    const registro = await this.findOne(id_alumno, id_examen);

    if (updateDto.nota !== undefined) {
      registro.nota = updateDto.nota;
    }

    return await this.aheRepository.save(registro);
  }

  async remove(id_alumno: number, id_examen: number): Promise<void> {
    const result = await this.aheRepository.delete({ id_alumno, id_examen });
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se encontró registro para el alumno con ID ${id_alumno} y examen con ID ${id_examen}.`,
      );
    }
  }
}
