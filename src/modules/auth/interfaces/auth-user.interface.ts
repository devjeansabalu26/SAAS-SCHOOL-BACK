export interface AuthUser{

    id:number;

    email:string;

    nombre:string;

    username?:string;

    tenantId?:number|null;

    tipoUsuario?:string|null;

    fotoUrl?:string|null;

}