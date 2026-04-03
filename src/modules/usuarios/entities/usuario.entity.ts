import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ name: 'username', nullable: true })
  username?: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password: string;

  @Column({ name: 'tipo_usuario', nullable: true })
  tipoUsuario?: string;

  @Column({ name: 'nombres', nullable: true })
  nombre?: string;

  @Column({ name: 'apellidos', nullable: true })
  apellidos?: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ name: 'foto_url', nullable: true })
  fotoUrl?: string;

  @Column({ name: 'intentos_fallidos', type: 'integer', default: 0 })
  intentosFallidos: number;

  @Column({ default: false })
  bloqueado: boolean;

  @Column({ name: 'email_verificado', default: false })
  emailVerificado: boolean;

  @Column({ name: 'token_recuperacion', nullable: true })
  tokenRecuperacion?: string;

  @Column({ name: 'token_expiracion', type: 'timestamp', nullable: true })
  tokenExpiracion?: Date;

  @Column({ nullable: true })
  estado?: string;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  ultimoLogin?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
