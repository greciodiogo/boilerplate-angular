export class GlobalConstants {

    public static GRUPO_PRODUTO_SIM_CARD_ID: number = 7;
    public static GRUPO_PRODUTO_RECARGA_FISICA_ID: number = 11;
    public static GRUPO_PRODUTO_BUNDLE_ID: number = 16;
    public static CATEGORIA_PRODUTO_BUNDLE_ID: number = 9;
    public static FORMA_PAGAMENTO_CARTEIRA_ID: number = 4;
    public static PRODUTO_CARREGAMENTO_PME_ID: number = 33;
    public static MOEDA_ISO: string = "AOA";
    public static MOEDA_ID_PAIS_INSTALACAO: number = 1;
    public static GRUPO_PRODUTO_NUMERACAO_ID: number = 0;
    public static GRUPO_PRODUTO_EQUIPAMENTO_ID: number = 0;
    public static IDS_TARIFARIOS_A_ACEITAR_NA_ACTIVACAO_EM_MASSA_PME: string = "222,2386,100";
    public static CATEGORIA_PRODUTO_SIM_CARD_ID: number = 1;
    public static CATEGORIA_PRODUTO_RECARGA_FISICA_ID: number = 4;
    public static CATEGORIA_PRODUTO_EQUIPAMENTO_ID: number = 5;
    public static CATEGORIA_PRODUTO_NUMERACAO_ID: number = 0;
    public static SERIE_DO_ANO_PME: string = "2022FRPME";
    public static ESTADOS_PEDIDO_ARMAZEM =
        [
            { estado: 0, descricao: "Pendente", bg: "bg-primary", fg: "text-white" },
            { estado: 1, descricao: "Aprovado", bg: "bg-success", fg: "text-white" },
            { estado: 2, descricao: "Rejeitado", bg: "bg-danger", fg: "text-white" },
            { estado: 3, descricao: "Cancelado", bg: "bg-danger", fg: "text-white" },
            { estado: 4, descricao: "Entrada", bg: "bg-primary", fg: "text-white" },
            { estado: 5, descricao: "Finalizado", bg: "bg-success", fg: "text-white" },
        ];
   public static ROLES_Q_APARECEM_APENAS_SUA_LOJA_NO_PEDIDO_PRODUTO= ["supervisor de loja"]
  
}
