import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateExamenTeoricoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsInt()
  numero_preguntas: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsInt()
  id_profesor: number;
}
