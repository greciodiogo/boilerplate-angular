import { RoleInterface } from "../../01Acl/interfaces/RoleInterface";

export interface UserInterface {
    id:number;
    name:string;
    email:string;
    username:string;
    password:string;
    role: RoleInterface;
}
