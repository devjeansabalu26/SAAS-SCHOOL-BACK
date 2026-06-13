import { AuthUser } from "./auth-user.interface";


export interface LoginResponse{

    accessToken:string;

    refreshToken:string;

    expiresIn:string;

    refreshExpiresIn:string;

    user:AuthUser;

}