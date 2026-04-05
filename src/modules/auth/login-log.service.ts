import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginLog } from '../../database/entities';

export interface CreateLoginLogDto {
  usuarioId: number;
  tenantId?: number;
  ip?: string;
  userAgent?: string;
  exitoso?: boolean;
}

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog)
    private readonly repository: Repository<LoginLog>,
  ) {}

  async create(createLoginLogDto: CreateLoginLogDto): Promise<LoginLog> {
    const loginLog = this.repository.create({
      ...createLoginLogDto,
      exitoso: createLoginLogDto.exitoso ?? true,
    });
    return this.repository.save(loginLog);
  }

  async findByUsuarioId(usuarioId: number, limit: number = 10): Promise<LoginLog[]> {
    return this.repository.find({
      where: { usuarioId },
      order: { fechaLogin: 'DESC' },
      take: limit,
    });
  }

  async findByTenantId(tenantId: number, limit: number = 50): Promise<LoginLog[]> {
    return this.repository.find({
      where: { tenantId },
      order: { fechaLogin: 'DESC' },
      take: limit,
    });
  }

  async getLoginStats(usuarioId: number, days: number = 30): Promise<{
    totalLogins: number;
    exitosos: number;
    fallidos: number;
  }> {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    const logs = await this.repository.find({
      where: {
        usuarioId,
        fechaLogin: dateFrom,
      },
    });

    return {
      totalLogins: logs.length,
      exitosos: logs.filter((log) => log.exitoso).length,
      fallidos: logs.filter((log) => !log.exitoso).length,
    };
  }
}
