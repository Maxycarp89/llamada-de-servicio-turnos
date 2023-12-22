import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LineChartData, PieChartData, BarChartData } from 'src/app/core/model/Chart-data';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lineChart: Chart<"line", number[], number> | undefined;
  pieChart: Chart<"pie", number[], string> | undefined;
  plansBarChart: Chart<"bar", number[], string> | undefined;
  plansExcercisesChart: Chart<"bar", number[], string> | undefined;

  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {
    this.generateCharts();
  }

  generateCharts() {

    const lineChartData: LineChartData = {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
      datasets: [
        {
          label: 'Clients',
          data: [15, 58, 102, 190, 180, 185, 205, 201, 198, 205],
        },
        {
          label: 'Admins',
          data: [2, 4, 8, 6, 7, 5, 6, 8, 5, 6],
        },
        {
          label: 'Site Admins',
          data: [2, 6, 8, 10, 15, 12, 11, 13, 15, 16],
        },
        {
          label: 'Trainers',
          data: [5, 12, 22, 40, 38, 35, 39, 45, 52, 57],
        },
      ]
    };

    const pieChartData: PieChartData = {
      labels: ['Admins', 'Site Admins', 'Trainers', 'Clients'],
      datasets: {
        data: [5, 10, 40, 200],
      },
    };

    const doughnutChartData: PieChartData = {
      labels: ['Admins', 'Site Admins', 'Trainers', 'Clients'],
      datasets: {
        data: [10, 20, 60, 340],
      },
    };

    const barChartPlansData: BarChartData = {
      labels: ['AF#1', 'AF#2', 'AF#3', 'AF#4', 'AF#5', 'AF#6', 'AF#7', 'AF#8', 'AF#9', 'AF#10'],
      datasets: {
        label: 'Plans',
        data: [100, 54, 123, 35, 64, 45, 66, 84, 98, 117],
      },
    };

    const barChartExcercisesData: BarChartData = {
      labels: ['Thrusters', 'Burpees', 'Jumping Jacks', 'Saltos a la Soga', 'Skipping', 'Plancha Jack', 'Swings', 'Vitalizaciones', 'Devil Press', 'Push-ups'],
      datasets: {
        label: 'Excercises',
        data: [510, 352, 621, 123, 220, 330, 347, 158, 98, 729],
      },
    };

    const barChartOptions = {
      plugins: {
        legend: {
          display: false
        },
      }
    };

    const doughnutChartOptions = {
      cutout: 80,
    };

    this.chartService.generateLineChart('line-chart', lineChartData, 'dustedglass', {});
    this.chartService.generateDoughnutChart('doughnut-chart', doughnutChartData, 'dustedglass', doughnutChartOptions);
    this.chartService.generatePieChart('pie-chart', pieChartData, 'dustedglass', {});
    this.chartService.generateBarChart('bar-plans-chart', barChartPlansData, 'dustedglass', barChartOptions);
    //this.chartService.generateBarChart('bar-excercises-chart', barChartExcercisesData,'nice', barChartOptions);

  }
}
