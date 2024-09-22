import { Deserializable } from "@app/shared/models/deserializable";

export class PermissionFields implements Deserializable{
  id: number;
  slug: string;
  name: string;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
