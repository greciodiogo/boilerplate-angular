import { Injectable, ViewChild } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
// ES6 Modules or TypeScript
import { Ng2IzitoastService } from 'ng2-izitoast';
import Swal from 'sweetalert2'
import { FnService } from "@app/shared/services/fn.helper.service";
import { ApiService } from "@app/core/providers/api.service";
@Injectable()
export class ErroInterceptor implements HttpInterceptor {
  currentUser
  constructor(
    public toasterService: ToastrService,
    private auth: AuthService,
    private router: Router,
    public iziToast: Ng2IzitoastService,
    private fnService: FnService,
    private http: ApiService
  ) {
    this.currentUser = this.auth.user
    this.iziToast.settings({
      timeout: 10000,
      toastOnce: true,
      pauseOnHover: false,
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'topRight',
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body.code === 201) {
            this.toasterService.info(evt.body.message, 'Info!');
          } else if (evt.body.message) {
            const timer = this.fnService.secondstoHHMMSS(this.fnService.millisToSeconds(45000));
            Swal.fire({
              icon: this.verifyAlreadyExistsData(evt.body.message) ? 'warning' : 'success',
              title: this.verifyAlreadyExistsData(evt.body.message) ? 'Aviso' : 'Sucesso!',
              html: `${evt.body.message} <br>Vou fechar em <b>${timer}</b>`,
              showConfirmButton: true,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            //this.toasterService.success(evt.body.message, 'Sucesso!');
          }
        }
      }),
      catchError(({ error: err, status }: HttpErrorResponse) => {
        let errorMessage =
          status === 0
            ? err.currentTarget.__zone_symbol__xhrURL.search(
              'server.test-cors.org'
            ) !== -1
              ? null
              : 'Dificuldades em estabelecer conexão com o servidor.'
            : err instanceof Array
              ? err[0].message
              : err.error === undefined
                ? status == 400
                  ? err.message
                  : err.message
                : err.error.message;
        if (status === 401) {
          if (err.error) {
            errorMessage = 'Token expirado, faça login.';
            this.http.post(`auth/changeIsLoggedUser`, this.currentUser)
              .pipe(finalize(() => { }))
              .subscribe((data) => {
              });
          }
        }

        const error = this.createErrorHandler(errorMessage, err)[status];
        const notificacao = {
          message: typeof (err) === 'object' ? err.message : err,
          classDiv: "alert-warning",
          classInfo: "fa-warning",
          textAlert: "Aviso",
          show: true,
        }
        this.fnService.alertEvent.emit(notificacao)

        if (!error) {
          /*this.iziToast.error({
              title: 'Erro desconhecido',
              message: 'Contacte o Administrador',
            });*/
          this.toasterService.error(
            'Por favor consulta a equipa de suporte',
            'Erro desconhecido'
          );
        } else {
          if (errorMessage !== null) {
            error();
          }
        }
        return throwError(err);
      })
    );
  }

  protected createErrorHandler(message: string, erro: any = null) {

    const handleError = (
      title: string,
      callback: Function,
      type: string = 'error',
      notify: boolean = true,
      alternativeMessage?: string
    ) => {
      if (notify) {
        /*this.iziToast[type]({
          title: title || '',
          message: alternativeMessage || message,
        });*/
        this.toasterService[type](alternativeMessage || message, title || '');
      }
      if (callback) {
        callback();
      }
    };


    return {
      400: () => {
        handleError("Error", null, 'warning', true, typeof(erro) === 'object'? erro?.message:erro);
        handleError("Já cadastrado", null, 'warning', true, typeof (erro) === 'object' ? erro?.message : erro);
      },
      401: () => {
        handleError(
          'Não autorizado:',
          () => {
            //this.auth.swalRefreshToken();
            this.auth.logout()
            this.router.navigate(['/login']);
          },
          'warning',
          true
        );
      },
      403: () => {
        handleError(
          null,
          () => {
            this.router.navigate(['/403']);
          },
          null,
          false
        );
      },
      404: () => {
        handleError('Nenhum Registo Encontrado', null, 'warning');
      },
      0: () => {
        handleError('Erro de Conexão', null, 'error');
      },
      500: () => {
        handleError(
          'Erro Interno:',
          null,
          'error',
          true,
          'Por favor consulta a equipa de suporte'
        );
      },
    };
  }

  verifyAlreadyExistsData(data) {
    if (data?.toLowerCase()?.indexOf("cadastrado") > -1 && data?.toLowerCase()?.indexOf("já") > -1)
      return true
    return false;
  }
}
