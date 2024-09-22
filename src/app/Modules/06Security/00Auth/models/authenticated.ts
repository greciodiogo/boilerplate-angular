import { Permission } from "../../01Acl/models/Permission";
import { Role } from "../../01Acl/models/Role";
import { Token } from "./token";
import { User } from "../../02Users/models/User";


export class Authenticated {
    user: User;
    token: Token;
    role: Role;
    permissions: Permission[];
}
