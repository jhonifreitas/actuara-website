// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostApi: 'https://southamerica-east1-actuar-cnae.cloudfunctions.net/api',
  firebase: {
    apiKey: 'AIzaSyBb4SdBTSM-WzCJYYmgqprMM1SpHAg-xA4',
    authDomain: 'actuar-cnae.firebaseapp.com',
    projectId: 'actuar-cnae',
    storageBucket: 'actuar-cnae.appspot.com',
    messagingSenderId: '350720912887',
    appId: '1:350720912887:web:d9aaca1df5db33f7b712f2'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
