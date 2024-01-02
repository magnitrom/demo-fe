
/* Un modelo para los gráficos. */
export interface ChartsModel{
  lineal?: LinealChartModel,
  horizontal?: HorizontalChartModel,
  vertical?: VerticalChartModel,
  vertical_2?: Vertical2ChartModel,
  pastel?: PastelChartModel
}

/* Definición de un modelo para el gráfico. */
export interface LinealChartModel{
  id: string,
  title: string,
  eje_x: string[],
  data: number[]
}

/* Definición de la interfaz para HorizontalChartModel. */
export interface HorizontalChartModel{
  id: string,
  title: string,
  color: string[],
  eje_y: string[],
  series: HorizontalSeriesModel[]
}


/* Definición de la interfaz para HorizontalSeriesModel. */
export interface HorizontalSeriesModel{
  name: string,
  data: number[]
}
/* Definición de la interfaz para VerticalChartModel. */
export interface VerticalChartModel{
  id: string,
  color: string[],
  eje_y: VerticalEjeYModel,
  series: VerticalSeriesModel
}

/* Definición de la interfaz para VerticalEjeYModel. */
export interface VerticalEjeYModel{
  type: string,
  name: string,
  min: number,
  max: number,
  interval: number,
  axisLabel: {
    formatter: string
  }
}
/* Definición de la interfaz para VerticalSeriesModel. */
export interface VerticalSeriesModel{
  name: string,
  type: string,
  barWidth?: string,
  data: number[]
}
/* Definición de la interfaz para Vertical2ChartModel. */
export interface Vertical2ChartModel{
  id: string,
  color: string[],
  eje_x: Vertical2EjeXModel,
  series: VerticalSeriesModel
}
/* Definición de la interfaz para Vertical2EjeXModel
. */
export interface Vertical2EjeXModel{
  type: string,
  data: string[];
  axisTick: {
    alignWithLabel: boolean
  }
}
/* Definición de la interfaz para PastelChartModel
. */
export interface PastelChartModel{
  id: string,
  color: string[],
  series: PastelSeriesModel
}

/* Definición de la interfaz para PastelSeriesModel
. */
export interface PastelSeriesModel{
  name: string,
  value: number
}
