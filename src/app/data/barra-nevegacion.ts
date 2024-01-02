
export const MenuSidebar: PerfilUsuario = {
  imagen: 'assets/images/alvin.png',
  usuario: 'Alvin Wang',
  email: 'alvin@gmail.com',
  apps:[
      {link:'', icono:'display_settings', texto:"App 1"},
      {link:'', icono:'view_comfy_alt', texto:"App 2"},
      {link:'', icono:'swipe_up_alt', texto:"App 3"},
      {link:'', icono:'satellite_alt', texto:"SIRET"},
  ],
  menu: [
    {
      titulo: 'Empezando',
      icono: 'home',
      link: '',
      opciones: [],
    },
    {
      link: '/mapa-sitio',
      icono: 'list_alt',
      titulo: 'Mapa de sitio',
      opciones: [],
    },
    {
      link: '/charts',
      icono: 'insert_chart',
      titulo: 'Estadistica',
      opciones: [],
    },
    {
      link: '/administrador-clasificador',
      icono: 'admin_panel_settings',
      titulo: 'Administrador de clasificador',
      opciones: [],
    },
    {
      link: '/registros',
      icono: 'table_rows',
      titulo: 'Registros & HTTP',
      opciones: [],
    },
    {
      link: '/crud',
      icono: 'ballot',
      titulo: 'CRUD & Tour',
      opciones: [],
    },

    {
      link: '/auth-valid',
      icono: 'how_to_reg',
      titulo: 'Registros & Autorizaciones',
      opciones: [],
    },
  
    {
      titulo: 'Más',
      icono: 'expand_more',
      opciones: [
        {
          link: '/forms',
          icono: 'grid_view',
          texto: 'Formularios',
        },
        {
          link: '/chat',
          icono: 'report_problem',
          texto: 'Chat',
        },
        {
          link: '/buttons',
          icono: 'wysiwyg',
          texto: 'Botones',
        },
      ],
    },
    
  ],
};


/* Definición de la estructura del objeto. */
export interface PerfilUsuario {
  imagen?: string;
  usuario?: string;
  email?: string;
  apps: Apps[];
  menu: Menu[];
}


/* Definición de la estructura del objeto. */
export interface Menu {
  titulo?: string;
  icono?: string;
  link?: string;
  opciones?: Opciones[];
}

/* Definición de la estructura del objeto. */
export interface Opciones {
  link?: string;
  texto?: string;
  icono?: string;
  opciones?: Opciones2[];
}

/* Definición de la estructura del objeto. */
export interface Apps {
    link?: string;
    texto?: string;
    icono?: string;
   
  }

/* Definición de la estructura del objeto. */
  export interface Opciones2 {
    link?: string;
    texto?: string;
    icono?: string;
    opciones?: Opciones3[];
  }
  
/* Definición de la estructura del objeto. */
  export interface Opciones3 {
    link?: string;
    texto?: string;
    icono?: string;
    opciones?: Opciones4[];
  }
  
/* Definición de la estructura del objeto. */
  export interface Opciones4 {
    link?: string;
    texto?: string;
    icono?: string;
    opciones?: Opciones5[];
  }

/* Definición de la estructura del objeto. */
  export interface Opciones5 {
    link?: string;
    texto?: string;
    icono?: string;
  }


  export const MenuSideNav2: Perfil = {
    usuario:{
       nombre: 'Leonel Miguel',
       imagen: 'assets/images/alvin.png',
       rol: 'Administrador',
       opciones:[
                {
                  titulo: 'Perfil',
                  icono: 'manage_accounts',
                  link: '/cerrarSesion'
                },
                {
                  titulo: 'Cerrar Sesión',
                  icono: 'logout',
                  link: '/cerrarSesion'
                },
              ]
    } ,

    navbar:[
        {
          titulo:"App 1",
          icono:'display_settings',
          opciones: [
            {
              titulo: 'App 1.1',
              icono: 'grid_view',
              link: '/app1_1'
            },
            {
              titulo: 'App 1.2',
              icono: 'report_problem',
              link: '/app1_2'
  
            }
          ],
        },
        {titulo:"App 2",icono:'view_comfy_alt',link:'/app2'},
        {titulo:"App 3",icono:'swipe_up_alt',link:'/app3'},
    ],
    sidenav: [
      {
        titulo: 'Opción 1',
        icono: 'home',
        link: '/opcion1',
        opciones: [],
      },
      {
        titulo: 'Opción 2',
        icono: 'list_alt',
        opciones: 
        [
          {
            titulo: '2.1',
            icono: 'grid_view',
            link: '/Opcion2_1'
          },
          {
            titulo: '2.2',
            icono: 'report_problem',
            link: '/Opcion2_2'

          },
        ],
      },
      {
        titulo: 'Opción 3',
        icono: 'insert_chart',
        opciones: [
          {
            titulo: '3.1',
            icono: 'grid_view',
            opciones: [
              {
                titulo: '3.1.1',
                icono: 'grid_view',
                link: '/Opcion3_1'
              },
              {
                titulo: '3.1.2',
                icono: 'grid_view',
                link: '/Opcion3_1'
              },
            ]
          },
          {
            titulo: '3.2',
            icono: 'report_problem',
            link: '/chat'
          },
          {
            titulo: '3.3',
            icono: 'wysiwyg',
            link: '/buttons'
          },

        ],
      },        
    ],
  };
  

/* Definición de la estructura del objeto. */
  export interface Perfil {
    imagenApp?: string;
    iconoApp?: string;
    nombreApp?: string;
    usuario?: Usuario;
    navbar: MenuGeneric[];
    sidenav: MenuGeneric[];
  }
  
/* Definición de la estructura del objeto. */
  export interface Usuario {
    nombre?: string;
    imagen?: string;
    rol?: string;
    opciones?: MenuGeneric[];
  }
  
/* Definición de la estructura del objeto. */
  export interface MenuGeneric {
    titulo?: string;
    icono?: string;
    link?: string;
    opciones?: MenuGeneric[];
  }
  
