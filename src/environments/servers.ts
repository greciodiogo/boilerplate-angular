// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export class Server {
  host: string;
  port: number;
  protocol: string;
  prefix: string;
  app_name:string;
  constructor(
    port: number,
    host: string = '127.0.0.1',
    app_name:string='at',
    protocol: string = 'http',
    prefix: string = 'api'
  ) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.prefix = prefix;
    this.app_name = app_name;
  }
}

export const Servers = { 
  // Ambiente produção do Cliente Angola Telecom
  ServProd: new Server(3300, '172.31.6.12','at'),
  ServQas: new Server(3000, '172.31.0.10','at'),
  
  //Ambiente de DEV & Teste
  Dev: new Server(3381, 'localhost'),
  Local: new Server(3333, 'localhost'),

};
