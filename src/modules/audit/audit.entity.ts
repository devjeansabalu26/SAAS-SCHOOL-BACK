import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('audit_logs')
export class AuditLog {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tenantId!: number;

  @Column()
  usuarioId!: number;

  @Column()
  modulo!: string;

  @Column()
  accion!: string;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  dataAnterior?: any;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  dataNueva?: any;

  @CreateDateColumn()
  createdAt!: Date;
}