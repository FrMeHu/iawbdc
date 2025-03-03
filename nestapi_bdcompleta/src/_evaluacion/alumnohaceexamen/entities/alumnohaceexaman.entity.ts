import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Alumno } from '../../alumno/entities/alumno.entity';
import { ExamenTeorico } from '../../examenteorico/entities/examenteorico.entity';

@Entity('alumno_hace_examen_teorico')
export class AlumnoHaceExamenTeorico {
  @PrimaryColumn()
  id_alumno: number;

  @PrimaryColumn()
  id_examen: number;

  @Column({ type: 'decimal' })
  nota: number;

  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoHaceExamenes)
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  @ManyToOne(() => ExamenTeorico, (examen) => examen.alumnoHaceExamenes)
  @JoinColumn({ name: 'id_examen' })
  examenTeorico: ExamenTeorico;
}
