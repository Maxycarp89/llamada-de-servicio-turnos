import { Injectable } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LineChartData, PieChartData, BarChartData } from 'src/app/core/model/Chart-data';
import { ColorPickerService } from './color-picker.service';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private colorPickerService: ColorPickerService) { }

  private defaultTension: number = 0.3;

  private defaultBorderWidth: number = 2;

  private defaultPointRadius: number = 0;

  generateLineChart(elementId: string, data: LineChartData, colorPalette: string, options: any): Chart<'line'> {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    const chart = new Chart<"line", number[], string>(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets.map(dataset => {
          const borderColor = dataset.borderColor || this.colorPickerService.getNextColor(colorPalette);
          const backgroundColor = dataset.backgroundColor || borderColor.replace('0.99', '0.05');
          return {
            label: dataset.label,
            data: dataset.data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: dataset.borderWidth || this.defaultBorderWidth,
            tension: dataset.tension || this.defaultTension,
            pointRadius: dataset.pointRadius || this.defaultPointRadius,
            fill: true
          };
        })
      },
      options: options || {}
    });
    return chart;
  }

  generatePieChart(elementId: string, data: PieChartData, colorPalette: string, options: any): Chart<'pie'> {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    const backgroundColor = Array.isArray(
      data.datasets.backgroundColor) ? data.datasets.backgroundColor : Array.from({
        length: data.datasets.data.length
      }, () => this.colorPickerService.getNextColor(colorPalette));
    const borderColor = Array.isArray(
      data.datasets.borderColor) ? data.datasets.borderColor : backgroundColor.map(color => color.replace('0.99', '1'));
    const chart = new Chart<'pie', number[], string>(ctx, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.datasets.data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: data.datasets.borderWidth || this.defaultBorderWidth
        }]
      },
      options: options || {}
    });
    return chart;
  }

  generateDoughnutChart(elementId: string, data: PieChartData, colorPalette: string, options: any): Chart<'doughnut'> {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    const borderColor = Array.isArray(
      data.datasets.borderColor) ? data.datasets.borderColor : Array.from({
        length: data.datasets.data.length
      }, () => this.colorPickerService.getNextColor(colorPalette));
    const backgroundColor = Array.isArray(
      data.datasets.backgroundColor) ? data.datasets.backgroundColor : borderColor;
    const chart = new Chart<'doughnut', number[], string>(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.datasets.data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: data.datasets.borderWidth || this.defaultBorderWidth
        }]
      },
      options: options || {}
    });
    return chart;
  }

  generateBarChart(elementId: string, data: BarChartData, colorPalette: string, options: any): Chart<'bar'> {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    const backgroundColor = Array.isArray(
      data.datasets.backgroundColor) ? data.datasets.backgroundColor : Array.from({
        length: data.datasets.data.length
      }, () => this.colorPickerService.getNextColor(colorPalette));
    const borderColor = Array.isArray(
      data.datasets.borderColor) ? data.datasets.borderColor : backgroundColor.map(color => color.replace('0.99', '1'));
    const chart = new Chart<'bar', number[], string>(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.datasets.label,
          data: data.datasets.data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: data.datasets.borderWidth || this.defaultBorderWidth
        }]
      },
      options: options || {}
    });
    return chart;
  }

}