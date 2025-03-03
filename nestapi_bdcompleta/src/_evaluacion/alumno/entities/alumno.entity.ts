import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from '../../alumnorealizapractica/entities/alumnorealizapractica.entity';
import { AlumnoHaceExamenTeorico } from 'src/_evaluacion/alumnohaceexamen/entities/alumnohaceexaman.entity';

@Entity('alumnos')
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nif: string;

  @Column()
  grupo: string;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column()
  apellido2: string;

  @OneToMany(() => AlumnoRealizaPractica, (arp) => arp.alumno)
  alumnoRealizaPracticas: AlumnoRealizaPractica[];

  @OneToMany(() => AlumnoHaceExamenTeorico, (ahe) => ahe.alumno)
  alumnoHaceExamenes: AlumnoHaceExamenTeorico[];

}
