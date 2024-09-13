import { Servers } from './servers';

export const environment = {
  production: true,
  host: Servers.ServProd.host,
  port:Servers.ServProd.port,
  app_url: `${Servers.ServProd.protocol}://${Servers.ServProd.host}:${Servers.ServProd.port}/${Servers.ServProd.prefix}/`,
  app:  Servers.ServProd.app_name,
  type:'PROD'
};
