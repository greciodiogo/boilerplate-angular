import { Servers } from './servers';

export const environment = {
  production: true,
  host: Servers.AtProd.host,
  port:Servers.AtProd.port,
  app_url: `${Servers.AtProd.protocol}://${Servers.AtProd.host}:${Servers.AtProd.port}/${Servers.AtProd.prefix}/`,
  app:  Servers.AtProd.app_name,
  type:'PROD'
};
