import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { calcMonts } from '../../../config/calcMonths';
import styles from './styles.module.scss'

interface PropsLineChart {
    titleChart: string;
    datasetChartLine?: ChartData
}
export function LineChart({ titleChart, datasetChartLine }: PropsLineChart) {
    const datasetChartLineInt: ChartData = {
        labels: calcMonts(),
        datasets: [
            {

                label: 'Outros Gastos',
                data: [5, 6, 7],
                backgroundColor: ['#EBB567'],
                borderColor: ['#EBB567']
            },
            {

                label: 'Cartões',
                data: [3, 2, 1],
                backgroundColor: ['#9739d4'],
                borderColor: ['#9739d4']
            },
        ],
    }
    return (
        <div className={styles.containerLineChart}>
            <h2>{titleChart}</h2>
            <Chart type='line' data={datasetChartLine || datasetChartLineInt} />
        </div>
    )
}