export interface LineChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
        borderWidth?: number;
        tension?: number;
        pointRadius?: number,
      }[];
}

export interface PieChartData {
    labels: string[];
    datasets: {
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
        borderWidth?: number;
    };
}

export interface BarChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
        borderWidth?: number;
        tension?: number;
    };
}