import { Deserializable } from '@app/shared/models/deserializable';
import { Role } from '../../01Acl/models/Role';
export class User implements Deserializable {
  id?: number = null;
  email: string;
  username: string;
  password: string;
  name: string = null;
  telefone: string;
  is_actived: boolean;
  perfil: Role[] = [];
  loja_id: number;
  direccao_id: number;
  loja:any;
  empresa:any;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
