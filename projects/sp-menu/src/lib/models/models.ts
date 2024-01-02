export interface Perfil {
    imagenApp?: string;
    iconoApp?: string;
    nombreApp?: string;
    usuario?: Usuario;
    navbar: MenuGeneric[];
    sidenav: MenuGeneric[];
  }
  export interface Usuario {
    nombre?: string;
    imagen?: string;
    rol?: string;
    opciones?: MenuGeneric[];
  }
  export interface MenuGeneric {
    titulo?: string;
    icono?: string;
    link?: string;
    opciones?: MenuGeneric[];
  }