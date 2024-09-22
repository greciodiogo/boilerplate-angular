import { Deserializable } from '@app/shared/models/deserializable';
import { Permission } from './Permission';

export class Role implements Deserializable{
  id: number=null;
  slug: string;
  name: string;
  description: string;
  permissions: Permission[];
  direccao_id=null

  deserialize(input): this {
    return Object.assign(this, input);
  }
}
