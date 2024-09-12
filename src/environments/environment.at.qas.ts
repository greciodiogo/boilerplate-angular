import { Servers } from './servers';

export const environment = {
  production: false,
  host: Servers.AtQas.host,
  port:Servers.AtQas.port,
  app_url: `${Servers.AtQas.protocol}://${Servers.AtQas.host}:${Servers.AtQas.port}/${Servers.AtQas.prefix}/`,
  app:  Servers.AtQas.app_name,
  type:'TEST'
};
