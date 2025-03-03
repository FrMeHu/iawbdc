import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from '../../alumnorealizapractica/entities/alumnorealizapractica.entity';
import { ProfesorDisenaPractica } from '../../profesordisenapractica/entities/profesordisenapractica.entity';

@Entity('practicas')
export class Practica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  dificultad: string;

  @OneToMany(() => AlumnoRealizaPractica, (arp) => arp.practica)
  alumnoRealizaPracticas: AlumnoRealizaPractica[];

  @OneToMany(() => ProfesorDisenaPractica, (pdp) => pdp.practica)
  profesoresDisenanPracticas: ProfesorDisenaPractica[];
}
