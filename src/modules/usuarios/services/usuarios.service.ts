import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../repositories/usuario.repository";

@Injectable()
export class UsuariosService {

  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {}
}