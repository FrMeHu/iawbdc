import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario,'base1')
    private userRepository: Repository<Usuario>,
  ) {}
  async findOne(email: string): Promise<Usuario | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async create(name: string, email: string, password: string): Promise<Usuario> {
    // const hashedPassword = await bcrypt.hash(password, 10); //si no se hiciera en el login de auth habría que ponerlo aquí
    const user = this.userRepository.create({
      name,
      email,
      password,
    });
    return this.userRepository.save(user);
  }
}