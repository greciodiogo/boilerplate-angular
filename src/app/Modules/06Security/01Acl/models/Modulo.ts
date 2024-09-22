import { Deserializable } from "@app/shared/models/deserializable";

export class Modulo implements Deserializable {
  id: number;
  slug: string;
  name: string;
  description: string;
  nome: string;
  descricao: string;
  is_principal: boolean;
  cor_texto_nome: string;
  cor_fundo_nome: string;
  icone: string;
  cor_icone: string;
  cor_fundo_icone: string;
  ordem: number;
  modulo_id: any;
  idsModulosSubModulo: any;
  permission_id:any

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
