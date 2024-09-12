// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//http://188.166.174.217:3377/

import { Servers } from './servers';

export const environment = {
  production: false,
  host: Servers.Dev.host,
  port: Servers.Dev.port,
  app_url: `${Servers.Dev.protocol}://${Servers.Dev.host}:${Servers.Dev.port}/${Servers.Dev.prefix}/`,
  app: Servers.Dev.app_name,
  type: 'DEV',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
