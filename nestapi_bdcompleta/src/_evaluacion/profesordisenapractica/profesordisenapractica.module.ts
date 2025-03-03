import { Module } from '@nestjs/common';
import { ProfesorDisenaPracticaService } from './profesordisenapractica.service';
import { ProfesorDisenaPracticaController } from './profesordisenapractica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorDisenaPractica } from './entities/profesordisenapractica.entity';
import { Profesor } from '../profesor/entities/profesor.entity';
import { Practica } from '../practica/entities/practica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorDisenaPractica, Profesor, Practica], 'base1')],
  controllers: [ProfesorDisenaPracticaController],
  providers: [ProfesorDisenaPracticaService],
})
export class ProfesorDisenaPracticaModule {}
