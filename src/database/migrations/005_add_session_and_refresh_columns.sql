-- Migration: 005_add_session_and_refresh_columns
-- Description: Agregar campos para refresh token y sesión activa a tabla usuarios

ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS current_hashed_refresh_token VARCHAR,
  ADD COLUMN IF NOT EXISTS session_id VARCHAR;
