import { IsString } from 'class-validator'

export class CreateAutorDto {
  @IsString()
  nombre: string

  @IsString()
  biografia: string

  @IsString()
  fotoUrl: string
}
