CREATE TABLE public.alumnos (
    id integer NOT NULL,
    tenant_id integer,
    usuario_id integer,
    codigo varchar(50),
    nombres varchar(150),
    apellidos varchar(150),
    tipo_documento varchar(50),
    numero_documento varchar(50),
    fecha_nacimiento date,
    genero varchar(20),
    direccion text,
    nombre_apoderado varchar(150),
    telefono_apoderado varchar(50),
    estado varchar(50),
    estado_academico varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE public.auditoria_log (
    id integer NOT NULL,
    tenant_id integer,
    usuario_id integer,
    tabla varchar(100),
    modulo varchar(100),
    accion varchar(100),
    descripcion text,
    registro_id integer,
    datos_antes text,
    datos_despues text,
    ip varchar(50),
    user_agent text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.colegios (
    id integer NOT NULL,
    nombre varchar(150),
    razon_social varchar(200),
    nombre_comercial varchar(200),
    ruc varchar(20),
    subdominio varchar(100),
    dominio varchar(150),
    logo_url varchar(255),
    color_primario varchar(20),
    color_secundario varchar(20),
    email_contacto varchar(150),
    telefono varchar(50),
    plan varchar(50),
    fecha_inicio_plan timestamp,
    fecha_fin_plan timestamp,
    activo boolean DEFAULT true,
    estado varchar(50),
    configuracion_json text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE public.conceptos_pago (
    id integer NOT NULL,
    tenant_id integer,
    nombre varchar(150),
    tipo varchar(50),
    periodicidad varchar(50),
    monto numeric(10,2),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.configuraciones (
    id integer NOT NULL,
    tenant_id integer,
    clave varchar(100),
    valor text,
    tipo varchar(50),
    descripcion text,
    es_publico boolean DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.curso_docente (
    id integer NOT NULL,
    curso_id integer,
    docente_id integer,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.cursos (
    id integer NOT NULL,
    tenant_id integer,
    codigo varchar(50),
    nombre varchar(150),
    descripcion text,
    nivel varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.deudas (
    id integer NOT NULL,
    tenant_id integer,
    alumno_id integer,
    concepto_id integer,
    monto numeric(10,2),
    saldo numeric(10,2),
    mora numeric(10,2),
    fecha_vencimiento date,
    estado varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.docentes (
    id integer NOT NULL,
    tenant_id integer,
    usuario_id integer,
    especialidad varchar(100),
    numero_documento varchar(50),
    telefono varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.grados (
    id integer NOT NULL,
    tenant_id integer,
    nombre varchar(100),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.login_log (
    id integer NOT NULL,
    tenant_id integer,
    usuario_id integer,
    fecha_login timestamp,
    ip varchar(50),
    user_agent text,
    exitoso boolean,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.matriculas (
    id integer NOT NULL,
    tenant_id integer,
    alumno_id integer,
    grado_id integer,
    seccion_id integer,
    anio integer,
    periodo varchar(50),
    tipo_matricula varchar(50),
    estado varchar(50),
    fecha timestamp,
    fecha_inicio date,
    fecha_fin date,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.notas (
    id integer NOT NULL,
    tenant_id integer,
    alumno_id integer,
    curso_id integer,
    tipo_evaluacion varchar(50),
    valor numeric(5,2),
    peso numeric(5,2),
    fecha date,
    observacion varchar(255),
    periodo varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.pagos (
    id integer NOT NULL,
    tenant_id integer,
    alumno_id integer,
    monto numeric(10,2),
    fecha timestamp,
    metodo varchar(50),
    numero_operacion varchar(100),
    estado varchar(50),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.pagos_detalle (
    id integer NOT NULL,
    pago_id integer,
    deuda_id integer,
    monto_pagado numeric(10,2),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.permisos (
    id integer NOT NULL,
    codigo varchar(100),
    modulo varchar(100),
    accion varchar(100),
    descripcion text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.roles (
    id integer NOT NULL,
    tenant_id integer,
    nombre varchar(100),
    codigo varchar(100),
    descripcion text,
    es_sistema boolean DEFAULT false,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.roles_permisos (
    id integer NOT NULL,
    rol_id integer,
    permiso_id integer,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.secciones (
    id integer NOT NULL,
    grado_id integer,
    nombre varchar(100),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp
);

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    tenant_id integer,
    username varchar(100),
    email varchar(150),
    password_hash text,
    tipo_usuario varchar(50),
    nombres varchar(150),
    apellidos varchar(150),
    telefono varchar(50),
    foto_url varchar(255),
    intentos_fallidos integer DEFAULT 0,
    bloqueado boolean DEFAULT false,
    email_verificado boolean DEFAULT false,
    token_recuperacion text,
    token_expiracion timestamp,
    estado varchar(50),
    ultimo_login timestamp,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE public.usuarios_roles (
    id integer NOT NULL,
    usuario_id integer,
    rol_id integer,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);