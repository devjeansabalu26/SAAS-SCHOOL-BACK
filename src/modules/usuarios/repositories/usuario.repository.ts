import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/database/entities";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UsuarioRepository {

  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

  create(data: DeepPartial<Usuario>) {
    return this.repository.save(
      this.repository.create(data),
    );
  }
}