import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateProfesorDisenaPracticaDto {
  @IsNotEmpty()
  @IsInt()
  id_profesor: number;

  @IsNotEmpty()
  @IsInt()
  id_practica: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;
}
