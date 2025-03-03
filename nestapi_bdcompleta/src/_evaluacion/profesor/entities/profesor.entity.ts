import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProfesorDisenaPractica } from '../../profesordisenapractica/entities/profesordisenapractica.entity';
import { ExamenTeorico } from '../../examenteorico/entities/examenteorico.entity';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nif: string;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column()
  apellido2: string;

  @OneToMany(() => ProfesorDisenaPractica, (pdp) => pdp.profesor)
  profesoresDisenanPracticas: ProfesorDisenaPractica[];

  @OneToMany(() => ExamenTeorico, (examenTeorico) => examenTeorico.profesor)
  examenesTeoricos: ExamenTeorico[];
}

