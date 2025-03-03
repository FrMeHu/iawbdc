import { IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreateAlumnoHaceExamenDto {
  @IsNotEmpty()
  @IsInt()
  id_alumno: number;

  @IsNotEmpty()
  @IsInt()
  id_examen: number;

  @IsNotEmpty()
  @IsNumber()
  nota: number;
}
