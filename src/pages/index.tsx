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
import { useEffect } from 'react'

interface TableData {
  headerToTable: string,
  bodyToTable: number[]
}

const Home: NextPage = () => {
  const earningsData = useEarnings()
  const spendingsData = useSpendings()
  const projectionData: TableData[] = []

  const datasetConfig: any = []
  const balanceConfig: any = []

  const earningsGlobalDataObject: TableData = {
    headerToTable: 'Ganhos',
    bodyToTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  const spendingsGlobalDataObject: TableData = {
    headerToTable: 'Gastos',
    bodyToTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  useEffect(() => {
    earningsData.modulesData.map(earningsModule => earningsModule.earningsData.map(earning => earning.bodyToTable.map((dataEarning, index) => {
      earningsGlobalDataObject.bodyToTable[index] += dataEarning
    })))

    spendingsData.modulesData.map(earningsModule => earningsModule.spendingsData.map(earning => earning.bodyToTable.map((dataEarning, index) => {
      spendingsGlobalDataObject.bodyToTable[index] += dataEarning
    })))

    projectionData.push(earningsGlobalDataObject)
    projectionData.push(spendingsGlobalDataObject)
  }, [])

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
        dataTable={projectionData}
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
