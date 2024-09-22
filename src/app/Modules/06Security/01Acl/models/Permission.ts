import { Deserializable } from "@app/shared/models/deserializable";

export class Permission implements Deserializable{
  id: number;
  slug: string;
  name: string;
  description: string;
  name_menu:string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
