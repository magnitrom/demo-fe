/* Definición de la interfaz para PreloaderModel. */
export interface PreloaderModel{
  lineal?: PreloaderLinealModel,
  circular?: PreloaderCircularModel
}
/* Definición de la interfaz para PreloaderLinealModel. */
export interface PreloaderLinealModel{
  tipo: string,
  width: string
}
/* Definición de la interfaz para PreloaderCircularModel. */
export interface PreloaderCircularModel{
  size?: string,
  color?: string,
  colors?: string[]
}
