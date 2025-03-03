import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDisenaPracticaDto } from './create-profesordisenapractica.dto';

export class UpdateProfesorDisenaPracticaDto extends PartialType(CreateProfesorDisenaPracticaDto) {}
