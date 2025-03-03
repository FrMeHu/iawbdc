import { Alumno } from '../../alumno/entities/alumno.entity';
import { Practica } from '../../practica/entities/practica.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('alumno_realiza_practica')
export class AlumnoRealizaPractica {
  @PrimaryColumn()
  id_alumno: number;

  @PrimaryColumn()
  id_practica: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'decimal' })
  nota: number;

  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoRealizaPracticas)
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  @ManyToOne(() => Practica, (practica) => practica.alumnoRealizaPracticas)
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
