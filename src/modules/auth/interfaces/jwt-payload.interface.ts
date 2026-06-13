export interface JwtPayload{

    sub:number;

    email:string;

    sessionId:string;

    tenantId?:number|null;

}