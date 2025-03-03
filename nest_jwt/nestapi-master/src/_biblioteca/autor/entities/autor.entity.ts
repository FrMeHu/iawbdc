@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column()
  biografia: string

  @Column()
  fotoUrl: string

  @OneToMany(() => Libro, (libro) => libro.autor)
  libros: Libro[]
}
