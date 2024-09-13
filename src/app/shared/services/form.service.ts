import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, finalize } from 'rxjs/operators';
import { ApiService } from '@core/providers/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private route: string = `form`;
  constructor(private http: ApiService) { }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Os grupos Dos Produtos'
   * @return Observable
   */
  public getGruposProduto() {
    return this.http
      .get(`${this.route}/getGruposProduto`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'searchClientes'
   * @return Observable
   */
  public searchGruposProduto(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/searchProdutoGrupos`, filters)
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'searchClientes'
   * @return Observable
   */
  public searchProdutoGruposVisivelPos(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/searchProdutoGruposVisivelPos`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'searchClientes'
   * @return Observable
   */
  public searchProdutosByProdutoGrupoId(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/searchProdutosByProdutoGrupoId`, filters)
      .pipe(map((data) => Object(data).data));
  }

  public searchClienteAdvanced(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/searchClienteAdvanced`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Os grupos Dos Produtos e seus produtos'
   * @return Observable
   */
  public getGruposProdutosComProdutos(): Observable<any> {
    return this.http
      .get(`${this.route}/getGruposProdutosComProdutos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Os grupos Dos Produtos e seus produtos'
   * @return Observable
   */
  public getSimCardPorLojaEstadoDif(estado): Observable<any> {
    return this.http
      .get(`${this.route}/getSimCardPorLojaEstadoDif?status=${estado}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Números Por Loja'
   * @return Observable
   */
  public getNumerosPorLoja(IdLoja): Observable<any> {
    return this.http
      .get(`${this.route}/getNumeracaoPorLoja?loja_id=${IdLoja}`)
      .pipe(map((data) => Object(data).data));
  }


  /**
  * @author 'neleosmar.cabanga@ideiasdinamicas.com'
  * @description 'Pegar os Utilizadores Por Direcção'
  * @return Observable
  */
  public getUsersByDireccao(direccaoId): Observable<any> {
    return this.http
      .get(`${this.route}/getUsersByDireccao?direccaoId=${direccaoId}`)
      .pipe(map((data) => Object(data).data));
  }
  public getUsers(): Observable<any> {
    return this.http
      .get(`${this.route}/getUsers`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTypesIdentities'
   * @return Observable
   */
  public getTypesIdentities(): Observable<any> {
    return this.http
      .get(`${this.route}/getTypesIdentities`)
      .pipe(map((data) => Object(data).data));
  }

  public getTypesNacionalidade(): Observable<any> {
    return this.http
      .get(`${this.route}/getTypesNacionalidade`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTypesClient'
   * @return Observable
   */
  public getTypesClient(): Observable<any> {
    return this.http
      .get(`${this.route}/getTypesClient`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTypesClient'
   * @return Observable
   */
  public getTypesClientBySlug(SlugTypesClient: string): Observable<any> {
    return this.http
      .get(`${this.route}/getTypesClientBySlug?slug=${SlugTypesClient}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTypesClient'
   * @return Observable
   */
  public getTypesAnexosNotInTypesClient(typeClientId): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTypesAnexosNotInTypesClient?typeClientId=${typeClientId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getTypesAnexosNotInTypesConta(typeContaId): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTypesAnexosNotInTypesConta?typeContaId=${typeContaId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTypesClient'
   * @return Observable
   */
  public getMotivoAnexoByArea(area): Observable<any> {
    return this.http
      .get(`${this.route}/getMotivoAnexoByArea?area=${area}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getDebitoContaByClienteId'
   * @return Observable
   */
  public getDebitoContaByClienteId(ClienteId): Observable<any> {
    return this.http
      .get(`${this.route}/getDebitoContaByClienteId?ClienteId=${ClienteId}`)
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getClienteGenerico'
   * @return Observable
   */
  public getClienteGenerico(): Observable<any> {
    return this.http
      .get(`${this.route}/getClienteGenerico`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTarifarios'
   * @return Observable
   */
  public getTarifarios(): Observable<any> {
    return this.http
      .get(`${this.route}/getTarifarios`)
      .pipe(map((data) => Object(data).data));
  }

  public getTarifarioById(tarifario_id): Observable<any> {
    return this.http
      .get(`${this.route}/getTarifarioById/${tarifario_id}`)
      .pipe(map((data) => Object(data).data));
  }

  public getTarifariosByTecnologiaId(tecnologiaId): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTarifariosByTecnologiaId?tecnologiaId=${tecnologiaId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getTarifariosByTecnologiaIdOS(tecnologiaId, tipoFacturacao): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTarifariosByTecnologiaIdOS?tecnologiaId=${tecnologiaId}&tipoFacturacao=${tipoFacturacao}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProvinces'
   * @return Observable
   */
  public getProvinces(): Observable<any> {
    return this.http
      .get(`${this.route}/getProvinces`)
      .pipe(map((data) => Object(data).data));
  }

  public getProvincesByPais(paisId): Observable<any> {
    return this.http
      .get(`${this.route}/getProvincesByPais?paisId=${paisId}`)
      .pipe(map((data) => Object(data).data));
  }
  public getPaises(): Observable<any> {
    return this.http
      .get(`${this.route}/getPaises`)
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getgetMunicipiosByProvinciaIdProvinces'
   * @return Observable
   */
  public getMunicipiosByProvinciaId(provinciaId: number): Observable<any> {
    return this.http
      .get(
        `${this.route}/getMunicipiosByProvinciaId?provinciaId=${provinciaId}`
      )
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getDistritosByMunicipioId'
   * @return Observable
   */
  public getDistritosByMunicipioId(municipioId: number): Observable<any> {
    return this.http
      .get(`${this.route}/getDistritosByMunicipioId?municipioId=${municipioId}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'searchClientes'
   * @return Observable
   */
  public searchClientes(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/search-clients`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getSearchProdutos'
   * @return Observable
   */
  public getSearchProdutos(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/getSearchProdutos`, filters)
      .pipe(map((data) => Object(data).data));
  }
  public getSearchProdutosOcasional(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/getSearchProdutosOcasional`, filters)
      .pipe(map((data) => Object(data).data));
  }

  public getProdutosByGrupoSlug() {
    return this.http
      .get(`${this.route}/getProdutosByGrupoSlug`)
      .pipe(map((data) => Object(data).data));
  }

  public getSearchSimCards(
    search?: string,
    filters?: HttpParams
  ): Observable<any> {
    filters =
      filters == undefined ? filters : filters.set('search', search.toString());
    return this.http
      .get(`${this.route}/getSearchSimCards`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getSearchProdutos'
   * @return Observable
   */
  public getSeries(typeDocs?: HttpParams): Observable<any> {
    return this.http
      .get(`${this.route}/getSeries`, typeDocs)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'neleosmar.cabanga@ideiasdinamicas.com'
   * @description 'getSearchProdutos'
   * @return Observable
   */
  public getSeriesByTipoFacturacao(filters?: HttpParams): Observable<any> {
    return this.http
      .get(`${this.route}/getSeriesByTipoFacturacao`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getSearchProdutos'
   * @return Observable
   */
  public getGestores(): Observable<any> {
    return this.http
      .get(`${this.route}/getUsers`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getSeriesByDocuments'
   * @return Observable
   */
  public getSeriesByDocuments(documento_id: number): Observable<any> {
    return this.http
      .get(`${this.route}/getSeriesByDocuments/${documento_id}`)
      .pipe(map((data) => Object(data).data));
  }

  public getAssistentesByLojaId(lojaId: number): Observable<any> {
    return this.http
      .get(`${this.route}/getAssistentesByLojaId?lojaId=${lojaId}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getFormaPagamentos'
   * @return Observable
   */
  public getFormaPagamentos(): Observable<any> {
    return this.http
      .get(`${this.route}/getFormaPagamentos`)
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getFormaPagamentos'
   * @return Observable
   */
  public getBancos(): Observable<any> {
    return this.http
      .get(`${this.route}/getBancos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getFormaPagamentos'
   * @return Observable
   */
  public getMoedas(): Observable<any> {
    return this.http
      .get(`${this.route}/getMoedas`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getFormaPagamentos'
   * @return Observable
   */
  public getImpostos(): Observable<any> {
    return this.http
      .get(`${this.route}/getImpostos`)
      .pipe(map((data) => Object(data).data));
  }
  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getOrganismos'
   * @return Observable
   */
  public getOrganismos(): Observable<any> {
    return this.http
      .get(`${this.route}/getOrganismos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getFormaPagamentos'
   * @return Observable
   */
  public getDocumentos(): Observable<any> {
    return this.http
      .get(`${this.route}/getDocumentos`)
      .pipe(map((data) => Object(data).data));
  }

  public getIsencoes(): Observable<any> {
    return this.http
      .get(`${this.route}/getIsencoes`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRoles'
   * @return Observable
   */
  public getRoles(): Observable<any> {
    return this.http
      .get(`${this.route}/getRoles`)
      .pipe(map((data) => Object(data).data));
  }

  public getOwners(): Observable<any> {
    return this.http
      .get(`${this.route}/owners`)
      .pipe(map((data) => Object(data).data));
  }

  public getArmazens(): Observable<any> {
    return this.http
      .get(`${this.route}/armazens`)
      .pipe(map((data) => Object(data).data));
  }

  public getArmazensByTipo(tipo): Observable<any> {
    return this.http
      .get(`${this.route}/getArmazensByTipo?tipo=${tipo}`)
      .pipe(map((data) => Object(data).data));
  }

  public getMotivosEntradaMercadoria(): Observable<any> {
    return this.http
      .get(`${this.route}/motivo-entrada-mercadorias`)
      .pipe(map((data) => Object(data).data));
  }

  public getMotivosDevolucao(): Observable<any> {
    return this.http
      .get(`${this.route}/motivo-devolucao`)
      .pipe(map((data) => Object(data).data));
  }

  public getProdutos(): Observable<any> {
    return this.http
      .get(`${this.route}/getProdutos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'showTablesDatabase'
   * @return Observable
   */
  public showTablesDatabase(): Observable<any> {
    return this.http
      .get(`${this.route}/showTablesDatabase`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProvinces'
   * @return Observable
   */
  public getGeneros(): Observable<any> {
    return this.http
      .get(`${this.route}/getGeneros`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadoCivils(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadoCivils`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadoServico(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadoServico`)
      .pipe(map((data) => Object(data).data));
  }

  public getComandoEstadoServicoCbs(): Observable<any> {
    return this.http
      .get(`${this.route}/getComandoEstadoServicoCbs`)
      .pipe(map((data) => Object(data).data));
  }

  public getTypeAnexoByTypeClientId(TypeClientId): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTypeAnexoByTypeClientId?TypeClientId=${TypeClientId}`
      )
      .pipe(map((data) => Object(data).data));
  }


  public getAllContactsByAgentes(cliente_id): Observable<any> {
    return this.http
      .get(
        `${this.route}/getAllContactsByAgentes?cliente_id=${cliente_id}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getTypeAnexoByTypeContaId(TypeContaId): Observable<any> {
    return this.http
      .get(`${this.route}/getTypeAnexoByTypeContaId?TypeContaId=${TypeContaId}`)
      .pipe(map((data) => Object(data).data));
  }

  public getTypeAnexosByArea(Area): Observable<any> {
    return this.http
      .get(`${this.route}/getTypesAnexosByArea?area=${Area}`)
      .pipe(map((data) => Object(data).data));
  }

  public getMotivoRejeicaoPedidoByArea(Area): Observable<any> {
    return this.http
      .get(`${this.route}/getMotivoRejeicaoPedidoByArea?area=${Area}`)
      .pipe(map((data) => Object(data).data));
  }

  public getTypeFileByIdType(typeIdFile): Observable<any> {
    return this.http
      .get(
        `files/getTypeFileByIdType?typeFile=clientes&typeIdFile=${typeIdFile}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'rufino.domingos@ideiasdinamicas.com'
   * @description 'getTecnologias'
   * @return Observable
   */
  public getTecnologias(): Observable<any> {
    return this.http
      .get(`${this.route}/getTecnologias`)
      .pipe(map((data) => Object(data).data));
  }

  public getTecnologiasByTipoFacturacao(
    tipoFacturacao = null
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTecnologiasByType?tipoFacturacao=${tipoFacturacao}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getModulos'
   * @return Observable
   */
  public getModulos(): Observable<any> {
    return this.http
      .get(`${this.route}/getModulos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getModulos'
   * @return Observable
   */
  public getSubModulos(): Observable<any> {
    return this.http
      .get(`${this.route}/getSubModulos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getTodosModulos'
   * @return Observable
   */
  public getTodosModulos(filters?: any): Observable<any> {
    return this.http
      .get(`${this.route}/getTodosModulos`, filters)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getModulos'
   * @return Observable
   */
  public getSubModulosNaoAssociAoModulo(modulo_id): Observable<any> {
    return this.http
      .get(
        `${this.route}/getSubModulosNaoAssociadAoModulo/?moduloId=${modulo_id}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'pegar Módulos e Submódulos'
   * @return Observable
   */
  public getModulosESubModulos(): Observable<any> {
    return this.http
      .get(`${this.route}/getModulosESubModulos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getModulos'
   * @return Observable
   */
  public getSubModulosByModulosId(modulo_id): Observable<any> {
    return this.http
      .get(`${this.route}/getSubModulosByModulosId/?moduloId=${modulo_id}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProvinces'
   * @return Observable
   */
  public getRangeSimCardBySerialNumber(
    startNumber,
    endNumber = '',
    requerNumero = '',
    typeAccount: string = '',
    typeFilter: string = 'ICCID',
    quantidade: string = ''
  ): Observable<any> {
    // console.log("startNumber:" + startNumber);
    return this.http
      .get(
        `${this.route
        }/getRangeSimCardBySerialNumber?startNumber=${startNumber}&endNumber=${endNumber.replace(
          /\s/g,
          ''
        )}
        &requerNumero=${requerNumero}&typeAccount=${typeAccount}&typeFilter=${typeFilter}&quant=${quantidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRangeRecargaFisicaBySerialNumber'
   * @return Observable
   */
  public getRangeRecargaFisicaBySerialNumber(
    startNumber,
    endNumber: string = '',
    produtoId: string = '',
    quantidade: string = '',
    nao_requer_loja_na_consulta = true
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeRecargaFisicaBySerialNumber?startNumber=${startNumber}&endNumber=${endNumber}&produtoId=${produtoId}&quant=${quantidade}&nao_requer_loja_na_consulta=${nao_requer_loja_na_consulta}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getEquipamentoBySerialNumber'
   * @return Observable
   */
  public getEquipamentoBySerialNumber(
    startNumber,
    endNumber = '',
    produtoId = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getEquipamentoBySerialNumber?startNumber=${startNumber}&endNumber=${endNumber}&produtoId=${produtoId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProvinces'
   * @return Observable
   */
  public getContaBancariasByBancoId(bancoId: string): Observable<any> {
    return this.http
      .get(`${this.route}/getContaBancariasByBancoId?bancoId=${bancoId}`)
      .pipe(map((data) => Object(data).data));
  }

  /* @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getCategorias'
   * @return Observable
   */
  public getCategoriasProduto(): Observable<any> {
    return this.http
      .get(`${this.route}/getCategoriaProduto`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Permissões Por Módulo'
   * @return Observable
   */
  public getPermissoesPorModulo(IdModulo): Observable<any> {
    return this.http
      .get(`${this.route}/getPermissoesPorModulo?modulo_id=${IdModulo}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Módulos Por Role'
   * @return Observable
   */
  public getModulosPorPerfil(role_id): Observable<any> {
    return this.http
      .get(`${this.route}/getModulosPorPerfil?role_id=${role_id}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Permissões Por Role'
   * @return Observable
   */
  public getPermissoesPorPerfil(role_id): Observable<any> {
    return this.http
      .get(`${this.route}/getPermissoesPorPerfil?role_id=${role_id}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar SimCard Por ICCID'
   * @return Observable
   */
  public getSimCardPorPorICCID(valor): Observable<any> {
    return this.http
      .get(`${this.route}/getPermissoesPorModulo?iccid=${valor}`)
      .pipe(map((data) => Object(data).data));
  }

  public getServiosClienteIdByContaId(
    ClienteId: number,
    ContaId: any = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getServiosClienteIdByContaId?ClienteId=${ClienteId}&ContaId=${ContaId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /* @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getLojas'
   * @return Observable
   */
  public getLojas(): Observable<any> {
    return this.http
      .get(`${this.route}/getLojas`)
      .pipe(map((data) => Object(data).data));
  }
  /* @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getLojas'
   * @return Observable
   */
  public getTPAsByLojaIdUserLogado(): Observable<any> {
    return this.http
      .get(`${this.route}/getTPAsByLojaIdUserLogado`)
      .pipe(map((data) => Object(data).data));
  }

  public getServicoByChaveServico(ChaveServico: string): Observable<any> {
    return this.http
      .get(
        `${this.route}/getServicoByChaveServico?ChaveServico=${ChaveServico}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getAllDataServicoByChaveServico(
    ChaveServico: string
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getAllDataServicoByChaveServico?ChaveServico=${ChaveServico}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getTipoConta(): Observable<any> {
    return this.http
      .get(`${this.route}/getTipoConta`)
      .pipe(map((data) => Object(data).data));
  }

  public getUserPorLoja(IdLoja): Observable<any> {
    return this.http
      .get(`${this.route}/getUserPorLoja?loja_id=${IdLoja}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Permissões '
   * @return Observable
   */
  public getPermissoesPorEntidadeRelacionada(entidade): Observable<any> {
    return this.http
      .get(
        `${this.route}/getPermissoesPorEntidadeRelacionada?entidade_relacionada=${entidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Permissões Apenas do módulo sem estar noutro ou num submódulo '
   * @return Observable
   */
  public getPermissoesPorModuloSemEstarNoutro(modulo_id): Observable<any> {
    return this.http
      .get(
        `${this.route}/getPermissoesPorModuloSemEstarNoutro?modulo_id=${modulo_id}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Todas as Permissões '
   * @return Observable
   */
  public getPermissoes(): Observable<any> {
    return this.http
      .get(`${this.route}/getPermissoes`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Permite listar todos dados'
   * @return Observable
   */
  public listarArmazens(
    search?: string,
    filters?: HttpParams,
    url?: string
  ): Observable<any> {
    filters == undefined ? filters : filters.set('search', search.toString());
    return this.http.get(`${this.route}/listarArmazens`, filters).pipe(
      debounceTime(500),
      finalize(() => { }),
      map((data) => Object(data).data)
    );
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProvinces'
   * @return Observable
   */
  public getRangeSimCardBySerialNumberTransferRange(
    startNumber,
    endNumber = '',
    requerNumero = '',
    typeAccount: string = '',
    typeFilter: string = 'ICCID',
    quantidade: string = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeSimCardBySerialNumberTransferRange?startNumber=${startNumber}&endNumber=${endNumber}
        &requerNumero=${requerNumero}&typeAccount=${typeAccount}&typeFilter=${typeFilter}&quant=${quantidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRangeRecargaFisicaBySerialNumberTransferRange'
   * @return Observable
   */
  public getRangeRecargaFisicaBySerialNumberTransferRange(
    startNumber,
    endNumber: string = '',
    produtoId: string = '',
    quantidade: string = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeRecargaFisicaBySerialNumberTransferRange?startNumber=${startNumber}&endNumber=${endNumber}&produtoId=${produtoId}&quant=${quantidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getEquipamentoBySerialNumberRange'
   * @return Observable
   */
  public getEquipamentoBySerialNumberRange(
    startNumber,
    endNumber = '',
    quantidade = 1
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getEquipamentoBySerialNumberRange?startNumber=${startNumber}&endNumber=${endNumber}&quant=${quantidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProdutosByGrupoId'
   * @return Observable
   */
  public getProdutosByGrupoId(grupo_id): Observable<any> {
    return this.http
      .get(`${this.route}/getProdutosByGrupoId?grupo_id=${grupo_id}`)
      .pipe(map((data) => Object(data).data));
  }

  public getRecargasFisicas(): Observable<any> {
    return this.http
      .get(`${this.route}/getRecargasFisicas`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getBundles'
   * @return Observable
   */
  public getBundles(): Observable<any> {
    return this.http
      .get(`${this.route}/getBundles`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getBundles'
   * @return Observable
   */
  public getFiliais(): Observable<any> {
    return this.http
      .get(`${this.route}/getFilials`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getPlanos'
   * @return Observable
   */
  public getPlanos(): Observable<any> {
    return this.http
      .get(`${this.route}/getPlanos`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getPlanos'
   * @return Observable
   */
  public getTarifarioPlanoFamilia(): Observable<any> {
    return this.http
      .get(`${this.route}/getTarifariosPlanoFamilia`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Os grupos Dos Produtos por ids de grupos da transferência'
   * @return Observable
   */
  public getGruposProdutoByIds(grupo_ids) {
    return this.http
      .get(`${this.route}/getGruposProdutoPorIds?grupo_ids=${grupo_ids}`)
      .pipe(map((data) => Object(data).data));
  }

  /* @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getCategorias'
   * @return Observable
   */
  public getCategoriasProdutoByCategoriaIds(categoria_ids): Observable<any> {
    return this.http
      .get(
        `${this.route}/getCategoriasProdutoByCategoriaIds?categoria_ids=${categoria_ids}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProdutosByGrupoId'
   * @return Observable
   */
  public getProdutosByCategoriaId(categoria_id): Observable<any> {
    return this.http
      .get(
        `${this.route}/getProdutosByCategoriaId?categoria_id=${categoria_id}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getProdutosByCategoriaSlug(slugs): Observable<any> {
    return this.http
      .get(
        `${this.route}/getProdutosByCategoriaSlug?slugs=${slugs}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Os Fornecedores'
   * @return Observable
   */
  public getFornecedores() {
    return this.http
      .get(`${this.route}/getFornecedores`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getProdutosByGrupoId'
   * @return Observable
   */
  public getProdutosByGrupoAndCategoriaId(
    grupo_id,
    categoria_id
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getProdutosByGrupoAndCategoriaId?grupo_id=${grupo_id}&categoria_id=${categoria_id}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Números Por Loja e Números Sem Loja'
   * @return Observable
   */
  public getNumeracaoDisponivelPorLojaESemLoja(IdLoja): Observable<any> {
    return this.http
      .get(
        `${this.route}/getNumeracaoDisponivelPorLojaESemLoja?loja_id=${IdLoja}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Estados dos Números'
   * @return Observable
   */
  public getEstadosNumeros() {
    return this.http
      .get(`${this.route}/getEstadosNumeros`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar   Range SimCard By SerialNumberTransferRangeStock(
   * @return Observable
   */
  public getRangeSimCardBySerialNumberTransferRangeStock(
    startNumber,
    endNumber = '',
    typeFilter: string = 'ICCID',
    quantidade: string = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeSimCardBySerialNumberTransferRangeStock?startNumber=${startNumber}&endNumber=${endNumber}
        &quant=${quantidade}&typeFilter=${typeFilter}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getSerieByNome'
   * @return Observable
   */
  public getSerieByNome(nome: any): Observable<any> {
    return this.http
      .get(`${this.route}/getSerieByNome/${nome}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getPlanos Por Ids dos Planos'
   * @return Observable
   */
  public getPlanosByIdsTarifarios(idsTarifarios): Observable<any> {
    return this.http
      .get(`${this.route}/getPlanosByIdsTarifarios/${idsTarifarios}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRangeRecargaFisicaBySerialNumberAndLoja'
   * @return Observable
   */
  public getRangeRecargaFisicaBySerialNumberAndLoja(
    startNumber,
    endNumber: string = '',
    produtoId: any = '',
    quantidade: string = '',
    lojaId: any = '',
    tipoLojaOrigem: any = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeRecargaFisicaBySerialNumberAndLoja?startNumber=${startNumber}&endNumber=${endNumber}&produtoId=${produtoId}&quant=${quantidade}&lojaId=${lojaId}&tipoLojaOrigem=${tipoLojaOrigem}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar  getRangeSimCardBySerialNumberAndLoja
   * @return Observable
   */
  public getRangeSimCardBySerialNumberAndLoja(
    startNumber,
    endNumber = '',
    typeFilter: string = 'ICCID',
    quantidade: string = '',
    lojaId: any = '',
    tipoLojaOrigem: string = '',
    produtoId = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeSimCardBySerialNumberAndLoja?startNumber=${startNumber}&endNumber=${endNumber}
          &quant=${quantidade}&typeFilter=${typeFilter}&lojaId=${lojaId}&tipoLojaOrigem=${tipoLojaOrigem}&produtoId=${produtoId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getEquipamentoBySerialNumberRangeAndLoja'
   * @return Observable
   */
  public getEquipamentoBySerialNumberRangeAndLoja(
    startNumber,
    endNumber = '',
    quantidade = 1,
    lojaId = '',
    tipoLojaOrigem = '',
    produtoId = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getEquipamentoBySerialNumberRangeAndLoja?startNumber=${startNumber}&endNumber=${endNumber}&quant=${quantidade}&lojaId=${lojaId}&tipoLojaOrigem=${tipoLojaOrigem}&produtoId=${produtoId}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getLoteProdutosByProduto(idProduto): Observable<any> {
    return this.http
      .get(`${this.route}/getLoteProdutosByProduto?produto_id=${idProduto}`)
      .pipe(map((data) => Object(data).data));
  }

  public getServiosClienteIdByContaIdChaveServicoExcel(
    ClienteId: number,
    numeros = [],
    ContaId: any = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getServiosClienteIdByContaIdChaveServicoExcel?ClienteId=${ClienteId}&ContaId=${ContaId}&numeros=${numeros}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getParametroGeralPorNome(nome): Observable<any> {
    return this.http
      .get(`${this.route}/getParametroGeralPorNome?nome=${nome}`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadosLoteProdutoPorArea(area): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosLoteProdutoPorArea?area=${area}`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Graficas'
   * @return Observable
   */
  public getGraficas() {
    return this.http
      .get(`${this.route}/getGraficas`)
      .pipe(map((data) => Object(data).data));
  }

  public getTipoReclamacoes(): Observable<any> {
    return this.http
      .get(`${this.route}/getTipoReclamacoes`)
      .pipe(map((data) => Object(data).data));
  }

  public getDireccoes(): Observable<any> {
    return this.http
      .get(`${this.route}/getDireccoes`)
      .pipe(map((data) => Object(data).data));
  }
  public getPrioridades(): Observable<any> {
    return this.http
      .get(`${this.route}/getPrioridades`)
      .pipe(map((data) => Object(data).data));
  }

  public getTrunkDirections(): Observable<any> {
    return this.http
      .get(`${this.route}/getTrunkDirections`)
      .pipe(map((data) => Object(data).data));
  }

  public getTrunkTypes(): Observable<any> {
    return this.http
      .get(`${this.route}/getTrunkTypes`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadosReclamacao(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosReclamacao`)
      .pipe(map((data) => Object(data).data));
  }


  public getEstadosPedidoNumeroEspecial(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosPedidoNumeroEspecial`)
      .pipe(map((data) => Object(data).data));
  }

  public getOperadoresNaReclamacao(): Observable<any> {
    return this.http
      .get(`${this.route}/getOperadoresNaReclamacao`)
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Números Por Loja e Números Sem Loja'
   * @return Observable
   */
  public getNumeracaoDisponivelPorNumero(numero): Observable<any> {
    return this.http
      .get(
        `${this.route}/getNumeracaoDisponivelPorNumero?numero=${numero}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getDireccaosByTecnologiaId(TecnologiaId): Observable<any> {
    return this.http
      .get(
        `${this.route}/getDireccaosByTecnologiaId?tecnologiaId=${TecnologiaId}`
      )
      .pipe(map((data) => Object(data).data));
  }


  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'Pegar Tipo de Anexos por Pedido'
   * @return Observable
   */
  public getTipoAnexoByPedido(): Observable<any> {
    return this.http
      .get(`${this.route}/getTipoAnexoByPedido`)
      .pipe(map((data) => Object(data).data));
  }

  /**
  * @author 'matondo.quela@ideiasdinamicas.com'
  * @description 'Pegar Tipo de Pedidos'
  * @return Observable
  */
  public getTiposPedido(): Observable<any> {
    return this.http
      .get(`${this.route}/getTipoEstados`)
      .pipe(map((data) => Object(data).data));
  }

  public getFilterExcel(filtro) {
    const translatedKeys = {
      'search': 'Pesquisa',
      'typeFilter': 'tipo de filtro',
      'tipodecliente': 'Tipo de Cliente',
      'data1': 'data inicio',
      'data2': 'data fim',
      'startDate':  'data inicio',
      'andtDate': 'data fim',
      'province': 'Província'
    };
    return Object.keys(filtro).map(key => ({
      name: translatedKeys[key] || key,
      value: filtro[key]
    }));
  }

  /**
  * @author 'matondo.quela@ideiasdinamicas.com'
  * @description 'Pegar SIMCard Por iccid'
  * @return Observable
  */
  public getSimCardByICCID(iccid): Observable<any> {
    return this.http
      .get(
        `${this.route}/getSimCardByICCID?iccid=${iccid}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getTiposMovimentoStock(): Observable<any> {
    return this.http
      .get(
        `${this.route}/getTiposMovimentoStock`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
  * @author 'matondo.quela@ideiasdinamicas.com'
  * @description 'Pegar getPedidoEstados'
  * @return Observable
  */
  public getPedidoEstados(): Observable<any> {
    return this.http
      .get(`${this.route}/getPedidoEstados`)
      .pipe(map((data) => Object(data).data));
  }

  public getServicoByChaveServicoOnPedido(ChaveServico: string): Observable<any> {
    return this.http
      .get(
        `${this.route}/getServicoByChaveServicoOnPedido?ChaveServico=${ChaveServico}`
      )
      .pipe(map((data) => Object(data).data));
  }

  /**
   * @author 'matondo.quela@ideiasdinamicas.com'
   * @description 'getRangeSimCardBySeriesOnTransfer'
   * @return Observable
   */
  public getRangeSimCardBySeriesOnTransfer(
    startNumber,
    endNumber = '',
    requerNumero = '',
    typeFilter: string = 'ICCID',
    lojaIdActual = null,
    quantidade: string = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route}/getRangeSimCardBySeriesOnTransfer?startNumber=${startNumber}&endNumber=${endNumber}
        &requerNumero=${requerNumero}&typeFilter=${typeFilter}&quant=${quantidade}&lojaIdActual=${lojaIdActual}`
      ).pipe(map((data) => Object(data).data));
  }

  /**
* @author 'matondo.quela@ideiasdinamicas.com'
* @description 'Pegar getEstadosPedidoProduto'
* @return Observable
*/
  public getEstadosPedidoProduto(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosPedidoProduto`)
      .pipe(map((data) => Object(data).data));
  }
  public getEstadosEquipamentos(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosEquipamentos`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadosSIMCards(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosSIMCards`)
      .pipe(map((data) => Object(data).data));
  }

  public getEstadosRecargasFisicas(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosRecargasFisicas`)
      .pipe(map((data) => Object(data).data));
  }


  public getUsersOnRejeicaoSolicitacao(): Observable<any> {
    return this.http
      .get(`${this.route}/getUsersOnRejeicaoSolicitacao`)
  }

  /**
    * @author 'manuel.direito@ideiasdinamicas.com'
    * @description 'getProvinces'
    * @return Observable
    */
  public getRangeSimCardReservadoBySerialNumber(
    startNumber,
    endNumber = '',
    requerNumero = '',
    typeAccount: string = '',
    typeFilter: string = 'ICCID',
    quantidade: string = ''
  ): Observable<any> {
    return this.http
      .get(
        `${this.route
        }/getRangeSimCardReservadoBySerialNumber?startNumber=${startNumber}&endNumber=${endNumber.replace(
          /\s/g,
          ''
        )}
      &requerNumero=${requerNumero}&typeAccount=${typeAccount}&typeFilter=${typeFilter}&quant=${quantidade}`
      )
      .pipe(map((data) => Object(data).data));
  }

  public getEstadosTransferenciaStock(): Observable<any> {
    return this.http
      .get(`${this.route}/getEstadosTransferenciaStock`)
      .pipe(map((data) => Object(data).data));
  }

  public getModemLteCpesDisponivel(numSerie): Observable<any> {
    return this.http
      .get(`${this.route}/getModemLteCpesDisponivel?numSerie=${numSerie}`)
      .pipe(map((data) => Object(data).data));
  }

  public searchSimCardByIccid(icced): Observable<any> {
    return this.http
      .get(`${this.route}/searchSimCardByIccid?iccid=${icced}`)
      .pipe(map((data) => Object(data).data));
  }

  public getServicoCapacidades(): Observable<any> {
    return this.http
      .get(`${this.route}/getServicoCapacidades`)
      .pipe(map((data) => Object(data).data));
  }




  public getGrupoFacturacao(): Observable<any> {
    return this.http
      .get(`${this.route}/getGrupoFacturacao`)
      .pipe(map((data) => Object(data).data));
  }


  /**
 * @author 'neleosmar.cabanga@ideiasdinamicas.com'
 * @description 'getFormaPagamentosPOS'
 * @return Observable
 */
  public getFormaPagamentosByLoja(): Observable<any> {
    return this.http
      .get(`${this.route}/getFormaPagamentosByLoja`)
      .pipe(map((data) => Object(data).data));
  }


  public getEscalaoCategoria(): Observable<any> {
    return this.http
      .get(`${this.route}/getEscalaoCategoria`)
      .pipe(map((data) => Object(data).data));
  }


  public getProdutosGrupoFlateRateByService(tarifario_id): Observable<any> {
    return this.http
      .get(
        `${this.route}/getProdutosGrupoFlateRateByService?tarifarioId=${tarifario_id}`
      )
      .pipe(map((data) => Object(data).data));
  }


}
