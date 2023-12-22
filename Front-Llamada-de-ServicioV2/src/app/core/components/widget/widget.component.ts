import { Component, Input, AfterViewInit } from '@angular/core';
import { WidgetData } from '../../model/Widget-data';
import { ChartsService } from '../../services/charts.service';
import { WidgetService } from '../../services/widgets.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements AfterViewInit {

  @Input() widgetType!: string;

  widgetCanvasId!: string;

  widgetData: WidgetData = {
    title: '',
    subtitle: '',
    cardClass: '',
    canvasId: '',
    chartData: { labels: [], datasets: [] },
    chartOptions: ''
  }

  loaded: boolean = false;

  constructor(private widgetService: WidgetService, private chartService: ChartsService) { }

  async ngAfterViewInit() {

    this.widgetData = await this.widgetService.generateWidget(this.widgetType);
    this.loaded = true;
    setTimeout(() => {
      this.chartService.generateLineChart(this.widgetData.canvasId, this.widgetData.chartData, 'default', this.widgetData.chartOptions);
    }, 200);
    
  }

}
