// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseURL: 'http://127.0.0.1:3000',
  webSocketURL: 'ws://127.0.0.1:8080'
};


export const userRoles = {
    ADMIN: 0,
    BARKEEPER: 1,
    VIEWER: 2,
    SEB_SPRINGER: 3
  };



