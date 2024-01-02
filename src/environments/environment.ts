const ambiente = '-desa';
const urlBase = `https://teso-siret-portal-admon-fe-group${ambiente}.apps.galel.sefin.gob.hn:443`;
const urlTokenSso = `https://info-token-sso-fe-group${ambiente}.apps.galel.sefin.gob.hn:443`;

export const environment = {
  production: false,
  API_URL:'http://localhost:4200/',
  keyCloakServiceURL: 'https://sso-desa.apps.galel.sefin.gob.hn/auth',
  keyCloakRealm: 'desa-sefin-sso',
  keyCloakClientId: 'fe-local-client',
  keyCloakBearerExcludedUrls: [
    '/assets',
    'http://localhost:4200/',
    urlBase,
    'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn',
    urlTokenSso,
  ],


  urlsTokenApp: [
    {
      idAplicacion: 'SIRET_PORTAL_ADMON_APP',
      urls: [
        urlBase,
        'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn',
      ]
    },
    {
      idAplicacion: 'SIRET_PORTAL_PUBLICO_APP',
      urls: [
        urlBase,
        'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn'
      ]
    }
  ],
  valueRequired:'OWFhM2QyNTkxNWYwMjhkYmYxMTQ3ZTE2NjVkNzc1NmE=',
  tokenUrl: `${urlTokenSso}/sso/obtenerTokenByAplicacion?idAplicacion=`,
  apiParametros: `http://api-teso-siret-mantenimiento-parametros-desa.apps.galel.sefin.gob.hn:80/`,
  apiUsuarios: `http://api-teso-siret-mantenimiento-usuarios-desa.apps.galel.sefin.gob.hn:80`,
  urlClasificadoresVirtuales: `http://api-clas-inop-interoperabilidad-desa.apps.galel.sefin.gob.hn:80`,
  urlApiInformes: `http://api-teso-siret-informes-tgr-desa.apps.galel.sefin.gob.hn:80`,
  urlApiPdfComprobante: `http://api-teso-siret-pdf-comprobante-desa.apps.galel.sefin.gob.hn:80`,
  urlApiComprobantes: `http://api-teso-siret-comprobantes-desa.apps.galel.sefin.gob.hn:80`,
  urlApiReversionTgr : `http://api-teso-siret-reversa-tgr-desa.apps.galel.sefin.gob.hn:80`,
  rolesPermitidosEnSistema:[
    'admin'
  ],
  URL_COMUN_A_MICROSERVICIOS: `${urlBase}`,
  urlApiServicios: `http://api-teso-siret-servicios-desa.apps.galel.sefin.gob.hn:80`,
  urlCierreDiario: `http://api-teso-siret-cierre-diario-desa.apps.galel.sefin.gob.hn:80`,
  urlAutUsr: `http://api-teso-siret-autenticacion-usuarios-desa.apps.galel.sefin.gob.hn:80`,
  urlInteroperabilidad: `http://api-clas-inop-interoperabilidad-desa.apps.galel.sefin.gob.hn:80`,
  urlDevolucion: `http://api-teso-siret-devolucion-tgr-desa.apps.galel.sefin.gob.hn:80`,
};
// export const environment = {
//   production: false,
//   API_URL:'http://localhost:4200/',
//   keyCloakServiceURL: 'https://sso-desa.apps.galel.sefin.gob.hn/auth',
//   keyCloakRealm: 'desa-sefin-sso',
//   keyCloakClientId: 'fe-local-client',
//   keyCloakBearerExcludedUrls: [
//     '/assets',
//     'http://localhost:4200/',
//     urlBase,
//     'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn',
//     urlTokenSso,
//   ],


//   urlsTokenApp: [
//     {
//       idAplicacion: 'SIRET_PORTAL_ADMON_APP',
//       urls: [
//         urlBase,
//         'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn',
//       ]
//     },
//     {
//       idAplicacion: 'SIRET_PORTAL_PUBLICO_APP',
//       urls: [
//         urlBase,
//         'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn'
//       ]
//     }
//   ],
//   valueRequired:'OWFhM2QyNTkxNWYwMjhkYmYxMTQ3ZTE2NjVkNzc1NmE=',
//   tokenUrl: `${urlTokenSso}/sso/obtenerTokenByAplicacion?idAplicacion=`,
//   apiParametros: `${urlBase}/oauthsiretmantparam/`,
//   apiUsuarios: `${urlBase}/oauthsiretmantusr/`,
//   urlClasificadoresVirtuales: `${urlBase}/oauthclasinterop`,
//   urlApiInformes: `${urlBase}/oauthsiretinfotgr`,
//   urlApiPdfComprobante: `${urlBase}/oauthsiretpdfcomp`,
//   urlApiComprobantes: `${urlBase}/oauthsiretcomp`,
//   urlApiReversionTgr : `${urlBase}/oauthsiretrevtgr`,
//   rolesPermitidosEnSistema:[
//     'admin'
//   ],
//   URL_COMUN_A_MICROSERVICIOS: `${urlBase}`,
//   urlApiServicios: `${urlBase}/oauthsiretserv`,
//   urlCierreDiario: `${urlBase}/oauthsiretciedia`,
//   urlAutUsr: `${urlBase}/oauthsiretautusr`,
//   urlInteroperabilidad: `${urlBase}/oauthclasinterop`,
//   urlDevolucion: `${urlBase}/oauthsiretdevtgr`,
// };