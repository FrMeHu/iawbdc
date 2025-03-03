import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoHaceExamenDto } from './create-alumnohaceexaman.dto';

export class UpdateAlumnoHaceExamenDto extends PartialType(CreateAlumnoHaceExamenDto) {}
