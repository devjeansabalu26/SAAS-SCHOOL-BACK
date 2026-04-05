import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('alumnos')
export class Alumno {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId?: number;

  @Column({ length: 50, nullable: true })
  codigo?: string;

  @Column({ length: 150, nullable: true })
  nombres?: string;

  @Column({ length: 150, nullable: true })
  apellidos?: string;

  @Column({ name: 'tipo_documento', length: 50, nullable: true })
  tipoDocumento?: string;

  @Column({ name: 'numero_documento', length: 50, nullable: true })
  numeroDocumento?: string;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento?: Date;

  @Column({ length: 20, nullable: true })
  genero?: string;

  @Column({ type: 'text', nullable: true })
  direccion?: string;

  @Column({ name: 'nombre_apoderado', length: 150, nullable: true })
  nombreApoderado?: string;

  @Column({ name: 'telefono_apoderado', length: 50, nullable: true })
  telefonoApoderado?: string;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @Column({ name: 'estado_academico', length: 50, nullable: true })
  estadoAcademico?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}

@Entity('auditoria_log')
export class AuditoriaLog {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId?: number;

  @Column({ length: 100, nullable: true })
  tabla?: string;

  @Column({ length: 100, nullable: true })
  modulo?: string;

  @Column({ length: 100, nullable: true })
  accion?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'registro_id', type: 'integer', nullable: true })
  registroId?: number;

  @Column({ name: 'datos_antes', type: 'text', nullable: true })
  datosAntes?: string;

  @Column({ name: 'datos_despues', type: 'text', nullable: true })
  datosDespues?: string;

  @Column({ length: 50, nullable: true })
  ip?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('colegios')
export class Colegio {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ length: 150, nullable: true })
  nombre?: string;

  @Column({ name: 'razon_social', length: 200, nullable: true })
  razonSocial?: string;

  @Column({ name: 'nombre_comercial', length: 200, nullable: true })
  nombreComercial?: string;

  @Column({ length: 20, nullable: true })
  ruc?: string;

  @Column({ length: 100, nullable: true })
  subdominio?: string;

  @Column({ length: 150, nullable: true })
  dominio?: string;

  @Column({ name: 'logo_url', length: 255, nullable: true })
  logoUrl?: string;

  @Column({ name: 'color_primario', length: 20, nullable: true })
  colorPrimario?: string;

  @Column({ name: 'color_secundario', length: 20, nullable: true })
  colorSecundario?: string;

  @Column({ name: 'email_contacto', length: 150, nullable: true })
  emailContacto?: string;

  @Column({ length: 50, nullable: true })
  telefono?: string;

  @Column({ length: 50, nullable: true })
  plan?: string;

  @Column({ name: 'fecha_inicio_plan', type: 'timestamp', nullable: true })
  fechaInicioPlan?: Date;

  @Column({ name: 'fecha_fin_plan', type: 'timestamp', nullable: true })
  fechaFinPlan?: Date;

  @Column({ default: true })
  activo: boolean;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @Column({ name: 'configuracion_json', type: 'text', nullable: true })
  configuracionJson?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}

@Entity('conceptos_pago')
export class ConceptoPago {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 150, nullable: true })
  nombre?: string;

  @Column({ length: 50, nullable: true })
  tipo?: string;

  @Column({ length: 50, nullable: true })
  periodicidad?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  monto?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('configuraciones')
export class Configuracion {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 100, nullable: true })
  clave?: string;

  @Column({ type: 'text', nullable: true })
  valor?: string;

  @Column({ length: 50, nullable: true })
  tipo?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'es_publico', default: false })
  esPublico: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('curso_docente')
export class CursoDocente {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'curso_id', type: 'integer', nullable: true })
  cursoId?: number;

  @Column({ name: 'docente_id', type: 'integer', nullable: true })
  docenteId?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('cursos')
export class Curso {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 50, nullable: true })
  codigo?: string;

  @Column({ length: 150, nullable: true })
  nombre?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ length: 50, nullable: true })
  nivel?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('deudas')
export class Deuda {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'alumno_id', type: 'integer', nullable: true })
  alumnoId?: number;

  @Column({ name: 'concepto_id', type: 'integer', nullable: true })
  conceptoId?: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  monto?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  saldo?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  mora?: string;

  @Column({ name: 'fecha_vencimiento', type: 'date', nullable: true })
  fechaVencimiento?: Date;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('docentes')
export class Docente {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId?: number;

  @Column({ length: 100, nullable: true })
  especialidad?: string;

  @Column({ name: 'numero_documento', length: 50, nullable: true })
  numeroDocumento?: string;

  @Column({ length: 50, nullable: true })
  telefono?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('grados')
export class Grado {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 100, nullable: true })
  nombre?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('login_log')
export class LoginLog {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'usuario_id', type: 'integer' })
  usuarioId: number;

  @Column({ name: 'fecha_login', type: 'timestamp', nullable: true })
  fechaLogin?: Date;

  @Column({ length: 50, nullable: true })
  ip?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;

  @Column({ default: true })
  exitoso: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('matriculas')
export class Matricula {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'alumno_id', type: 'integer', nullable: true })
  alumnoId?: number;

  @Column({ name: 'grado_id', type: 'integer', nullable: true })
  gradoId?: number;

  @Column({ name: 'seccion_id', type: 'integer', nullable: true })
  seccionId?: number;

  @Column({ type: 'integer', nullable: true })
  anio?: number;

  @Column({ length: 50, nullable: true })
  periodo?: string;

  @Column({ name: 'tipo_matricula', length: 50, nullable: true })
  tipoMatricula?: string;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha?: Date;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio?: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('notas')
export class Nota {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'alumno_id', type: 'integer', nullable: true })
  alumnoId?: number;

  @Column({ name: 'curso_id', type: 'integer', nullable: true })
  cursoId?: number;

  @Column({ name: 'tipo_evaluacion', length: 50, nullable: true })
  tipoEvaluacion?: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  valor?: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  peso?: string;

  @Column({ type: 'date', nullable: true })
  fecha?: Date;

  @Column({ length: 255, nullable: true })
  observacion?: string;

  @Column({ length: 50, nullable: true })
  periodo?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('pagos')
export class Pago {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ name: 'alumno_id', type: 'integer', nullable: true })
  alumnoId?: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  monto?: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha?: Date;

  @Column({ length: 50, nullable: true })
  metodo?: string;

  @Column({ name: 'numero_operacion', length: 100, nullable: true })
  numeroOperacion?: string;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('pagos_detalle')
export class PagoDetalle {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'pago_id', type: 'integer', nullable: true })
  pagoId?: number;

  @Column({ name: 'deuda_id', type: 'integer', nullable: true })
  deudaId?: number;

  @Column({ name: 'monto_pagado', type: 'numeric', precision: 10, scale: 2, nullable: true })
  montoPagado?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('permisos')
export class Permiso {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ length: 100, nullable: true })
  codigo?: string;

  @Column({ length: 100, nullable: true })
  modulo?: string;

  @Column({ length: 100, nullable: true })
  accion?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('roles')
export class Rol {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 100, nullable: true })
  nombre?: string;

  @Column({ length: 100, nullable: true })
  codigo?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'es_sistema', default: false })
  esSistema: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('roles_permisos')
export class RolPermiso {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'rol_id', type: 'integer', nullable: true })
  rolId?: number;

  @Column({ name: 'permiso_id', type: 'integer', nullable: true })
  permisoId?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity('secciones')
export class Seccion {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'grado_id', type: 'integer', nullable: true })
  gradoId?: number;

  @Column({ length: 100, nullable: true })
  nombre?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'tenant_id', type: 'integer', nullable: true })
  tenantId?: number;

  @Column({ length: 100, nullable: true })
  username?: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text', nullable: true })
  password?: string;

  @Column({ name: 'current_hashed_refresh_token', type: 'text', nullable: true })
  currentHashedRefreshToken?: string;

  @Column({ name: 'session_id', length: 255, nullable: true })
  sessionId?: string;

  @Column({ name: 'tipo_usuario', length: 50, nullable: true })
  tipoUsuario?: string;

  @Column({ name: 'nombres', length: 150, nullable: true })
  nombre?: string;

  @Column({ name: 'apellidos', length: 150, nullable: true })
  apellidos?: string;

  @Column({ length: 50, nullable: true })
  telefono?: string;

  @Column({ name: 'foto_url', length: 255, nullable: true })
  fotoUrl?: string;

  @Column({ name: 'intentos_fallidos', type: 'integer', default: 0 })
  intentosFallidos: number;

  @Column({ default: false })
  bloqueado: boolean;

  @Column({ name: 'email_verificado', default: false })
  emailVerificado: boolean;

  @Column({ name: 'token_recuperacion', type: 'text', nullable: true })
  tokenRecuperacion?: string;

  @Column({ name: 'token_expiracion', type: 'timestamp', nullable: true })
  tokenExpiracion?: Date;

  @Column({ length: 50, nullable: true })
  estado?: string;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  ultimoLogin?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}

@Entity('usuarios_roles')
export class UsuarioRol {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId?: number;

  @Column({ name: 'rol_id', type: 'integer', nullable: true })
  rolId?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
