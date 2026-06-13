# 📚 Documentación API - SaaS Colegio

## 🎯 Resumen de Cambios Implementados

Se ha realizado una actualización completa del sistema de autenticación y documentación API:

### ✅ 1. Sistema de Login Log
- **Nueva tabla**: `login_log` para registrar cada intento de login
- **Datos capturados**:
  - IP del cliente
  - User-Agent del navegador
  - Fecha/hora del login
  - Estado (exitoso/fallido)
  - ID del usuario y tenant

### ✅ 2. Token JWT en Respuesta de Login
- El endpoint `/auth/login` ahora retorna:
  ```json
  {
    "access_token": "eyJhbGci...",
    "expires_in": "3600s",
    "user": {
      "id": 1,
      "email": "usuario@example.com",
      "nombre": "Juan Pérez"
    }
  }
  ```

### ✅ 3. Protección de Todas las APIs con JWT
- Todas las rutas (excepto registro/login) ahora requieren un token JWT válido
- Decorador reutilizable `@Protected()` para proteger endpoints

### ✅ 4. Documentación con Swagger
- Swagger disponible en: `http://localhost:3000/api/docs`
- Interfaz profesional y ordenada
- Todos los endpoints documentados

---

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=saas_colegio

JWT_SECRET=tu_secret_key_muy_segura_aqui
JWT_EXPIRES_IN=24h
```

### 3. Ejecutar Migraciones
Conectarse a PostgreSQL y ejecutar los scripts en orden:

```bash
# 1. Conectar a la base de datos
psql -U postgres -d saas_colegio

# 2. Ejecutar las migraciones
\i src/database/migrations/001_create_tables.sql
\i src/database/migrations/002_insert_data.sql
\i src/database/migrations/003_procedures.sql
\i src/database/migrations/004_create_login_log.sql
```

### 4. Iniciar el Servidor
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

## 📊 Estructura de la API

### 🔐 Autenticación (Sin protección)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |

### 👥 Usuarios (Con JWT)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/:id` | Obtener usuario por ID |
| POST | `/usuarios` | Crear nuevo usuario |
| PATCH | `/usuarios/:id` | Actualizar usuario |
| DELETE | `/usuarios/:id` | Eliminar usuario |

### 🎓 Alumnos (Con JWT)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/alumnos` | Obtener todos los alumnos |

### 🏫 Colegios (Con JWT)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/colegios` | Obtener todos los colegios |

---

## 🔑 Cómo Usar con Postman o cURL

### 1. Registrar Usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "nombre": "Juan Pérez",
    "password": "password123"
  }'
```

### 2. Iniciar Sesión
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": "3600s",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "nombre": "Juan Pérez"
  }
}
```

### 3. Usar el Token en Peticiones Protegidas
```bash
curl -X GET http://localhost:3000/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📖 Explorar con Swagger UI

1. Abrir navegador en: **http://localhost:3000/api/docs**
2. Click en "Authorize" (botón azul arriba a la derecha)
3. Pegar el token obtenido del login (sin la palabra "Bearer")
4. Click en "Authorize"
5. Explorar y probar todos los endpoints

### Características de Swagger:
- ✅ Todas las rutas documentadas
- ✅ Ejemplos de request/response
- ✅ Validación de parámetros
- ✅ Interfaz interactiva para probar APIs
- ✅ Autenticación Bearer Token integrada

---

## 🔒 Seguridad

### Token JWT
- **Algoritmo**: HS256
- **Expiración**: 24h (configurable en `.env`)
- **Secret**: Variable en `.env`

### Decorador @Protected()
Usado para proteger rutas reutilizablemente:

```typescript
@Controller('usuarios')
@Protected()
export class UsuariosController {
  // Todos los métodos están protegidos con JWT
}
```

### Login Log
Registro automático de:
- ✅ IP del cliente
- ✅ User-Agent
- ✅ Fecha y hora
- ✅ Estado del login (exitoso/fallido)

---

## 📝 Tabla `login_log`

```sql
CREATE TABLE login_log (
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
```

### Índices para Rendimiento:
```sql
CREATE INDEX idx_login_log_usuario_id ON login_log(usuario_id);
CREATE INDEX idx_login_log_tenant_id ON login_log(tenant_id);
CREATE INDEX idx_login_log_fecha_login ON login_log(fecha_login);
CREATE INDEX idx_login_log_exitoso ON login_log(exitoso);
```

---

## 🛠️ Troubleshooting

### Error: "Token inválido o expirado"
- Verificar que el token está siendo enviado en el header `Authorization: Bearer <token>`
- Verificar que el token no ha expirado
- Volver a hacer login para obtener un nuevo token

### Error: "No se puede conectar a la base de datos"
- Verificar que PostgreSQL está corriendo
- Verificar credenciales en `.env`
- Ejecutar migraciones

### Sin documentación Swagger
- Verificar que `@nestjs/swagger` está instalado
- Verificar que el servidor está corriendo en `localhost:3000`
- Acceder a `http://localhost:3000/api/docs`

---

## 📁 Estructura de Archivos Relevantes

```
src/
├── modules/
│   ├── auth/
│   │   ├── entities/
│   │   │   └── login-log.entity.ts      (Nueva)
│   │   ├── auth.service.ts               (Modificado)
│   │   ├── auth.controller.ts            (Documentado)
│   │   ├── login-log.service.ts          (Nuevo)
│   │   └── auth.module.ts                (Modificado)
│   ├── usuarios/
│   │   ├── usuarios.controller.ts        (Documentado)
│   │   ├── dto/
│   │   │   ├── create-usuario.dto.ts     (Documentado)
│   │   │   └── update-usuario.dto.ts     (Documentado)
│   ├── alumnos/
│   │   └── alumnos.controller.ts         (Documentado)
│   └── colegios/
│       └── colegios.controller.ts        (Documentado)
├── common/
│   ├── decorators/
│   │   ├── tenant.decorator.ts
│   │   └── protected.decorator.ts        (Nuevo - reutilizable)
│   └── guards/
│       ├── tenant.guard.ts
│       └── jwt-auth.guard.ts             (Nuevo)
├── database/
│   └── migrations/
│       └── 004_create_login_log.sql      (Nueva)
├── app.controller.ts                     (Documentado)
└── main.ts                               (Configurado Swagger)
```

---

## ✨ Próximas Mejoras Sugeridas

1. **Refresh Tokens**: Implementar tokens de refresco para mayor seguridad
2. **Rate Limiting**: Limitar intentos de login para prevenir ataques bruta
3. **2FA**: Autenticación de dos factores
4. **Auditoría**: Registrar más eventos en login_log
5. **CORS refinado**: Actualizar CORS según ambiente
6. **Documentation**: Agregar más documentación en Swagger

---

## 📞 Soporte

Para problemas o preguntas sobre la documentación y la API, contactar al equipo de desarrollo.

**Versión**: 1.0.0  
**Última actualización**: 4 de Abril de 2025
