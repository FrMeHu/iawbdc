import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateAlumnoRealizaPracticaDto {
  @IsNotEmpty()
  @IsNumber()
  id_alumno: number;

  @IsNotEmpty()
  @IsNumber()
  id_practica: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsNumber()
  nota: number;
}
