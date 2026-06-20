import { InjectRepository } from "@nestjs/typeorm";
import { AuditLog } from "./audit.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuditService {

  constructor(
    @InjectRepository(AuditLog)
    private readonly repository:
      Repository<AuditLog>,
  ) {}

  async registrar(
    data: Partial<AuditLog>,
  ) {
    return this.repository.save(
      this.repository.create(data),
    );
  }
}