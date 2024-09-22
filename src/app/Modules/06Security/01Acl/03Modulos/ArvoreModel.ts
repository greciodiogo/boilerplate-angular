import { Permission } from "../models/Permission";

export class ArvoreModel {
  public title: string;
    public url?: string;
    public children: ArvoreModel[];

    public id?: number;
    public slug?: string;
    public name?: string;
    public description?: string;
    public nome?: string;
    public descricao?: string;
    public is_principal?: boolean;
    public cor_texto_nome?: string;
    public cor_fundo_nome?: string;
    public icone?: string;
    public cor_icone?: string;
    public cor_fundo_icone?: string;
    public ordem?: number;
    public modulo_id?: any;
    public modulosDoSubModulo?: any;
    public modulo_submodulo_id:number;

    public modulo?:ArvoreModel;
    public subModulos?:ArvoreModel[];
    public operacoes?:Permission[]
}
