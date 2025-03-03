import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { AlumnoHaceExamenTeorico } from 'src/_evaluacion/alumnohaceexamen/entities/alumnohaceexaman.entity';

@Entity('examenes_teoricos')
export class ExamenTeorico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  numero_preguntas: number;

  @Column({ type: 'date' })
  fecha: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.examenesTeoricos)
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  @OneToMany(() => AlumnoHaceExamenTeorico, (ahe) => ahe.examenTeorico)
    alumnoHaceExamenes: AlumnoHaceExamenTeorico[];
}
