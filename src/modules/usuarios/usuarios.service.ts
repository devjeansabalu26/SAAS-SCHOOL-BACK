import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  findAll(tenantId?: string) {
    if (tenantId) {
      return this.repository.find({ where: { tenantId } });
    }
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id: parseInt(id, 10) });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.repository.create(createUsuarioDto);
    return this.repository.save(usuario);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.repository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
