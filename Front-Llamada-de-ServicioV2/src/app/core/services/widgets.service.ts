import { Injectable } from '@angular/core';
import { LineChartData } from '../model/Chart-data';
import { WidgetData } from '../model/Widget-data';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {

    widgetType!: string;
    chartData: LineChartData = { labels: [], datasets: [] };

    constructor() { }

    async generateWidget(widgetType: string): Promise<WidgetData> {
        return new Promise((resolve) => {
            let chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false,
                        beginAtZero: true
                    },
                    y: {
                        display: false,
                        beginAtZero: true
                    }
                }
            };

            let chartData: LineChartData;

            switch (widgetType) {

                // Solid Widgets

                case 'total-sales-solid':
                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: [1200, 2700, 1980, 1940, 1880, 1685, 2050, 2350, 3198, 3405, 3175, 3290],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    };

                    const totalSalesSolidWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Total Sales',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    };
                    resolve(totalSalesSolidWidget);
                    break;

                case 'month-sales-solid':
                    chartData = {
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: [120, 270, 198, 190, 180, 165, 250, 290, 398, 340],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    }

                    const monthSalesSolidWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Month Sales',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData,
                    }
                    resolve(monthSalesSolidWidget);
                    break;

                case 'week-sales-solid':
                    chartData = {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: [120, 250, 180, 140, 180, 165, 205],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    }

                    const weekSalesSolidWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Week Sales',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(weekSalesSolidWidget);
                    break;

                case 'refunds-solid':
                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Refunds',
                                data: [151, 122, 116, 192, 175, 158, 102, 99, 107, 110, 137, 150],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    }

                    const totalRefundsSolidWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Total Refunds',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(totalRefundsSolidWidget);
                    break;

                case 'vouchers-solid':
                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Vouchers',
                                data: [1000, 1102, 1360, 1420, 1654, 1380, 1100, 958, 1005, 1184, 1352, 1655],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    }

                    const totalVouchersSolidWidget: WidgetData = {
                        title: this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Issued Vouchers',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    setTimeout(() => {
                        resolve(totalVouchersSolidWidget);
                    }, 4000);
                    break;

                case 'visits-solid':
                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Visits',
                                data: [150, 152, 160, 129, 178, 182, 107, 97, 157, 111, 162, 115],
                                borderColor: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(255,255,255,0.3)'
                            },
                        ]
                    }

                    const totalVisitsSolidWidget: WidgetData = {
                        title: this.calculateTotal(chartData.datasets[0].data),
                        subtitle: 'Total Visits',
                        cardClass: this.getCardClass(this.calculateTotal(chartData.datasets[0].data), widgetType),
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(totalVisitsSolidWidget);
                    break;


                // Clear Widgets //

                case 'total-sales':

                    const totalSalesData = [1200, 2700, 1980, 1940, 1880, 1685, 2050, 2350, 3198, 3405, 3175, 3290];

                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: totalSalesData,
                                borderColor: this.getChartBorderColor(this.calculateTotal(totalSalesData), 20000, 10000),
                                backgroundColor: this.getChartBackgroundColor(this.calculateTotal(totalSalesData), 20000, 10000),
                            },
                        ]
                    }

                    const totalSalesWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(totalSalesData),
                        subtitle: 'Total Sales',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(totalSalesWidget);
                    break;

                case 'month-sales':

                    const monthSalesData = [120, 270, 198, 190, 180, 165, 250, 290, 398, 340];

                    chartData = {
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: monthSalesData,
                                borderColor: this.getChartBorderColor(this.calculateTotal(monthSalesData), 2500, 1000),
                                backgroundColor: this.getChartBackgroundColor(this.calculateTotal(monthSalesData), 2500, 1000),
                            },
                        ]
                    }

                    const monthSalesWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(monthSalesData),
                        subtitle: 'Month Sales',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData,
                    }
                    resolve(monthSalesWidget);
                    break;

                case 'week-sales':

                    const weekSalesData = [120, 250, 180, 140, 180, 165, 205];

                    chartData = {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [
                            {
                                label: 'Sales',
                                data: weekSalesData,
                                borderColor: this.getChartBorderColor(this.calculateTotal(weekSalesData), 1300, 1300),
                                backgroundColor: this.getChartBackgroundColor(this.calculateTotal(weekSalesData), 1300, 1300),
                            },
                        ]
                    }

                    const weekSalesWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(weekSalesData),
                        subtitle: 'Week Sales',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(weekSalesWidget);
                    break;

                case 'refunds':

                    const refundsData = [151, 122, 116, 192, 175, 158, 102, 99, 107, 110, 137, 150]

                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Refunds',
                                data: refundsData,
                                borderColor: this.getChartBorderColor(this.calculateTotal(refundsData), 1500, 10000),
                                backgroundColor: this.getChartBackgroundColor(this.calculateTotal(refundsData), 1500, 10000),
                            },
                        ]
                    }

                    const totalRefundsWidget: WidgetData = {
                        title: 'USD ' + this.calculateTotal(refundsData),
                        subtitle: 'Total Refunds',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(totalRefundsWidget);
                    break;

                case 'vouchers':

                    const vouchersData = [1000, 1102, 1360, 1420, 1654, 1380, 1100, 958, 1005, 1184, 1352, 1655];

                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Vouchers',
                                data: vouchersData,
                                borderColor: 'rgba(50, 31, 219, 0.8)',
                                backgroundColor: 'rgba(50, 31, 219, 0.5)',
                            },
                        ]
                    }

                    const totalVouchersWidget: WidgetData = {
                        title: this.calculateTotal(vouchersData),
                        subtitle: 'Issued Vouchers',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    setTimeout(() => {
                        resolve(totalVouchersWidget);
                    }, 4000);
                    break;

                case 'visits':

                    const visitsData = [150, 152, 160, 129, 178, 182, 107, 97, 157, 111, 162, 115];

                    chartData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: 'Visits',
                                data: visitsData,
                                borderColor: 'rgba(51, 153, 255, 0.8)',
                                backgroundColor: 'rgba(51, 153, 255, 0.5)',
                            },
                        ]
                    }

                    const totalVisitsWidget: WidgetData = {
                        title: this.calculateTotal(visitsData),
                        subtitle: 'Total Visits',
                        cardClass: 'widget widget-clear',
                        canvasId: this.getCanvasId(widgetType),
                        chartOptions,
                        chartData
                    }
                    resolve(totalVisitsWidget);
                    break;



                default:
                    const errorWidget: WidgetData = {
                        title: 'Error',
                        subtitle: 'Unknown Widget Type',
                        chartData: {
                            labels: [],
                            datasets: []
                        },
                        cardClass: this.getCardClass(0, widgetType),
                        canvasId: this.getCanvasId(widgetType),
                    };
                    resolve(errorWidget);
                    break;
            }
        })
    }

    getCanvasId(widgetType: string): string {
        return widgetType + '-widget';
    }

    getCardClass(total: number, widgetType: string): string {

        // Umbrales para las clases // TODO: LLEVAR ESTO A CONFIGURACIÓN GENERAL
        const totalSalesSuccessThreshold = 20000;
        const totalSalesWarningThreshold = 10000;
        const monthSalesSuccessThreshold = 2500;
        const monthSalesWarningThreshold = 1000;
        const weekSalesSuccessThreshold = 1300;
        const weekSalesWarningThreshold = 1300;
        const refundsSuccessThreshold = 1500;
        const refundsWarningThreshold = 10000;

        switch (widgetType) {
            case 'total-sales-solid':
                if (total > totalSalesSuccessThreshold) {
                    return 'widget widget-success';
                } else if (total > totalSalesWarningThreshold) {
                    return 'widget widget-warning';
                } else {
                    return 'widget widget-danger';
                }
            case 'month-sales-solid':
                if (total > monthSalesSuccessThreshold) {
                    return 'widget widget-success';
                } else if (total > monthSalesWarningThreshold) {
                    return 'widget widget-warning';
                } else {
                    return 'widget widget-danger';
                }
            case 'week-sales-solid':
                if (total > weekSalesSuccessThreshold) {
                    return 'widget widget-success';
                } else if (total > weekSalesWarningThreshold) {
                    return 'widget widget-warning';
                } else {
                    return 'widget widget-danger';
                }
            case 'refunds-solid':
                if (total > refundsSuccessThreshold) {
                    return 'widget widget-success';
                } else if (total > refundsWarningThreshold) {
                    return 'widget widget-warning';
                } else {
                    return 'widget widget-danger';
                }
            case 'vouchers-solid':
                return 'widget widget-primary';
            case 'visits-solid':
                return 'widget widget-info';
            default:
                return 'widget widget-error';
        }
    }

    getChartBorderColor(total: number, successThreshold: number, warningThreshold: number): string {

        if (total > successThreshold) {
            return 'rgba(46, 184, 92, 0.8)';
        } else if (total < successThreshold && total > warningThreshold) {
            return 'rgba(249, 177, 21, 0.8)';
        } else {
            return 'rgba(229, 83, 83, 0.8)';
        }

    }

    getChartBackgroundColor(total: number, successThreshold: number, warningThreshold: number): string {

        if (total > successThreshold) {
            return 'rgba(46, 184, 92, 0.5)';
        } else if (total < successThreshold && total > warningThreshold) {
            return 'rgba(249, 177, 21, 0.5)';
        } else {
            return 'rgba(229, 83, 83, 0.5)';
        }


    }

    calculateTotal(data: number[]): number {
        return data.reduce((total, value) => total + value, 0);
    }


}