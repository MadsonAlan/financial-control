import type { NextPage } from 'next'
import Head from 'next/head'
import { LineChart } from '../components/Charts/LineChart/LineChart'
import { CarrousselCreditCard } from '../components/CarrousselCreditCard/CarrousselCreditCard'
import { HeaderPage } from '../components/Header/HeaderPage'
import styles from '../styles/Home.module.scss'
import { TableDatas } from '../components/TableDatas/TableDatas'
import { useEarnings } from '../hooks/earnings/useEarnings'
import { ChartData } from 'chart.js'
import { calcMonts } from '../config/calcMonths'
import { useSpendings } from '../hooks/spendings/useSpendings'

const Home: NextPage = () => {
  const earningsData = useEarnings()
  const spendingsData = useSpendings()

  const datasetConfig: any = []



  spendingsData.modulesData.map(spendingModule => spendingModule.spendingsData.map(spending => {
    datasetConfig.push({
      label: spending.headerToTable,
      data: spending.bodyToTable,
      backgroundColor: ['#EBB567'],
      borderColor: ['#EBB567']
    })
  }))





  const datasetChartLine: ChartData = {
    labels: calcMonts(),
    datasets: datasetConfig
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Cálculos e previsões</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderPage />
      <CarrousselCreditCard />
      <TableDatas
        titleTable='Projeção de 12 meses'
        dataTable={earningsData.modulesData[0]?.earningsData}
        functionEditLineTable={() => { }}
        functionExclude={() => { }}
        keyComponent={1}
      />
      <section className={styles.sectionChartsGrid}>
        <LineChart titleChart='Gastos Mensais' datasetChartLine={datasetChartLine} />
        <LineChart titleChart='Saldo no final do mês' />
      </section>
    </div>
  )
}

export default Home
