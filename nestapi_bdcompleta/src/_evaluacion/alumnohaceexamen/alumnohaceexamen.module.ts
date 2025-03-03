import { Module } from '@nestjs/common';
import { AlumnoHaceExamenService } from './alumnohaceexamen.service';
import { AlumnoHaceExamenController } from './alumnohaceexamen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoHaceExamenTeorico } from './entities/alumnohaceexaman.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { ExamenTeorico } from '../examenteorico/entities/examenteorico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoHaceExamenTeorico, Alumno, ExamenTeorico], 'base1')],
  controllers: [AlumnoHaceExamenController],
  providers: [AlumnoHaceExamenService],
})
export class AlumnoHaceExamenModule {}
