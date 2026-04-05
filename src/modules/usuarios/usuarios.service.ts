import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Usuario } from '../../database/entities';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  findAll(tenantId?: number | string) {
    if (tenantId !== undefined) {
      return this.repository.find({
        where: { tenantId: typeof tenantId === 'string' ? Number(tenantId) : tenantId },
      });
    }
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id: parseInt(id, 10) });
  }

  findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const payload: DeepPartial<Usuario> = {
      ...createUsuarioDto,
      tenantId:
        createUsuarioDto.tenantId !== undefined
          ? Number(createUsuarioDto.tenantId)
          : undefined,
    };
    const usuario = this.repository.create(payload);
    return this.repository.save(usuario) as Promise<Usuario>;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const partial: any = { ...updateUsuarioDto };
    if (partial.tenantId !== undefined) {
      partial.tenantId = Number(partial.tenantId);
    }
    await this.repository.update(id, partial);
    return this.findOne(id);
  }

  async updateSession(userId: number, sessionId: string, hashedRefreshToken: string) {
    await this.repository.update(userId, {
      sessionId,
      currentHashedRefreshToken: hashedRefreshToken,
    });
  }

  async clearSession(userId: number) {
    await this.repository.update(userId, {
      sessionId: null as any,
      currentHashedRefreshToken: null as any,
    });
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}
