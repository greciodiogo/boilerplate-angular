import { Servers } from './servers';

export const environment = {
  production: false,
  host: Servers.ServQas.host,
  port:Servers.ServQas.port,
  app_url: `${Servers.ServQas.protocol}://${Servers.ServQas.host}:${Servers.ServQas.port}/${Servers.ServQas.prefix}/`,
  app:  Servers.ServQas.app_name,
  type:'TEST'
};
