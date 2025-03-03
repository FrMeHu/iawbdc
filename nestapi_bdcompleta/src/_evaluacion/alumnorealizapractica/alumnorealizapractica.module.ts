import { Module } from '@nestjs/common';
import { AlumnoRealizaPracticaService } from './alumnorealizapractica.service';
import { AlumnoRealizaPracticaController } from './alumnorealizapractica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoRealizaPractica } from './entities/alumnorealizapractica.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Practica } from '../practica/entities/practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoRealizaPractica, Alumno, Practica], 'base1')], 
  controllers: [AlumnoRealizaPracticaController],
  providers: [AlumnoRealizaPracticaService],
})
export class AlumnoRealizaPracticaModule {}
