const ambiente = '';
const urlBase = `https://teso-siret-portal-admon-fe-group${ambiente}.apps.galel.sefin.gob.hn:443`;
const urlTokenSso = `https://info-token-sso-fe-group${ambiente}.apps.galel.sefin.gob.hn:443`;

export const environment = {
  production: true,
  API_URL:'http://localhost:4200/',
  keyCloakServiceURL: 'https://sso-desa.apps.galel.sefin.gob.hn/auth',
  keyCloakRealm: 'desa-sefin-sso',
  keyCloakClientId: 'fe-siret-adm-client',
  keyCloakBearerExcludedUrls: [
    '/assets',
    'http://localhost:4200/',
    urlBase,
    'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn',
    'https://sefin-fe-tokensso-dev.apps.galel.sefin.gob.hn:443',
    'https://sefin-fe-tokensso-dev.apps.galel.sefin.gob.hn'
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
      idAplicacion: 'SIRET_PORTAL_ADMON_APP',
      urls: [
        urlBase,
        'https://teso-siret-portal-admon-fe-group-desa.apps.galel.sefin.gob.hn'
      ]
    }
  ],
  valueRequired:'OWFhM2QyNTkxNWYwMjhkYmYxMTQ3ZTE2NjVkNzc1NmE=',
  tokenUrl: `${urlTokenSso}/sso/obtenerTokenByAplicacion?idAplicacion=`,
  apiParametros: `${urlBase}/oauthsiretmantparam/`,
  apiUsuarios: `${urlBase}/oauthsiretmantusr/`,
  urlClasificadoresVirtuales: `${urlBase}/oauthclasinterop`,
  urlApiInformes: `${urlBase}/oauthsiretinfotgr`,
  urlApiPdfComprobante: `${urlBase}/oauthsiretpdfcomp`,
  urlApiComprobantes: `${urlBase}/oauthsiretcomp`,
  urlApiReversionTgr : `${urlBase}/oauthsiretrevtgr`,
  rolesPermitidosEnSistema:[
    'admin'
  ],
  URL_COMUN_A_MICROSERVICIOS: `${urlBase}`,
  urlApiServicios: `${urlBase}/oauthsiretserv`,
  urlCierreDiario: `${urlBase}/oauthsiretciedia`,
  urlAutUsr: `${urlBase}/oauthsiretautusr`,
  urlInteroperabilidad: `${urlBase}/oauthclasinterop`,
  urlDevolucion: `${urlBase}/oauthsiretdevtgr`,
};