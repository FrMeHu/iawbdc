import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoRealizaPracticaDto } from './create-alumnorealizapractica.dto';

export class UpdateAlumnorealizapracticaDto extends PartialType(CreateAlumnoRealizaPracticaDto) {}
