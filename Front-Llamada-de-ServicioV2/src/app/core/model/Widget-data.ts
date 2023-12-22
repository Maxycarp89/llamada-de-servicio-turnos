import { LineChartData } from "./Chart-data";

export interface WidgetData {
    title: any;
    subtitle: string;
    cardClass: string;
    canvasId: string;
    chartData: LineChartData;
    chartOptions?: any;
  }