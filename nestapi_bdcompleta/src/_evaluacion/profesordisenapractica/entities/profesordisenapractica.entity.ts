import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Practica } from '../../practica/entities/practica.entity';

@Entity('profesor_disena_practica')
export class ProfesorDisenaPractica {
  @PrimaryColumn()
  id_profesor: number;

  @PrimaryColumn()
  id_practica: number;

  @Column({ type: 'date' })
  fecha: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.profesoresDisenanPracticas)
  @JoinColumn({ name: 'id_profesor' })
  profesor: Profesor;

  @ManyToOne(() => Practica, (practica) => practica.profesoresDisenanPracticas)
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
