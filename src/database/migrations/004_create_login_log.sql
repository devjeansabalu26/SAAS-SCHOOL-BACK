-- Migration: 004_create_login_log_table
-- Description: Crear tabla para registrar los logins de usuarios

CREATE TABLE IF NOT EXISTS login_log (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER,
  usuario_id INTEGER NOT NULL,
  
  fecha_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45),
  user_agent VARCHAR(500),
  exitoso BOOLEAN NOT NULL DEFAULT true,
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id) REFERENCES colegios(id) ON DELETE SET NULL
);

-- Crear índices para mejorar rendimiento de consultas
CREATE INDEX IF NOT EXISTS idx_login_log_usuario_id ON login_log(usuario_id);
CREATE INDEX IF NOT EXISTS idx_login_log_tenant_id ON login_log(tenant_id);
CREATE INDEX IF NOT EXISTS idx_login_log_fecha_login ON login_log(fecha_login);
CREATE INDEX IF NOT EXISTS idx_login_log_exitoso ON login_log(exitoso);
