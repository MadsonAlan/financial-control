import type { NextPage } from 'next'
import Head from 'next/head'
import { LineChart } from '../components/Charts/LineChart/LineChart'
import { CarrousselCreditCard } from '../components/CarrousselCreditCard/CarrousselCreditCard'
import { HeaderPage } from '../components/Header/HeaderPage'
import styles from '../styles/Home.module.scss'
import { TableDatas } from '../components/TableDatas/TableDatas'
import { useEarnings } from '../hooks/earnings/useEarnings'
import { ChartData, ChartDataset } from 'chart.js'
import { calcMonts } from '../config/calcMonths'
import { useSpendings } from '../hooks/spendings/useSpendings'
import { useEffect, useState } from 'react'

interface TableData {
  headerToTable: string,
  bodyToTable: number[]
}

const Home: NextPage = () => {
  const earningsData = useEarnings()
  const spendingsData = useSpendings()
  const [projectionData, setProjectionData] = useState<TableData[]>([])

  const datasetConfig: any = []
  const [balanceConfig, setBalanceConfig] = useState<any[]>([])

  const earningsGlobalDataObject: TableData = {
    headerToTable: 'Ganhos',
    bodyToTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  const spendingsGlobalDataObject: TableData = {
    headerToTable: 'Gastos',
    bodyToTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  const balanceGlobalDataObject: TableData = {
    headerToTable: 'Saldo',
    bodyToTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }


  useEffect(() => {
    earningsData.modulesData.map(earningsModule => earningsModule.earningsData.map(earning => earning.bodyToTable.map((dataEarning, index) => {
      earningsGlobalDataObject.bodyToTable[index] += dataEarning
    })))

    spendingsData.modulesData.map(earningsModule => earningsModule.spendingsData.map(earning => earning.bodyToTable.map((dataEarning, index) => {
      spendingsGlobalDataObject.bodyToTable[index] += dataEarning
    })))


    for (let index = 0; index < 12; index++) {
      balanceGlobalDataObject.bodyToTable[index] = (earningsGlobalDataObject.bodyToTable[index] - spendingsGlobalDataObject.bodyToTable[index])
    }

    setBalanceConfig([{
      label: balanceGlobalDataObject.headerToTable,
      data: balanceGlobalDataObject.bodyToTable,
      backgroundColor: ['#EBB567'],
      borderColor: ['#EBB567']
    }])

    setProjectionData([
      earningsGlobalDataObject,
      spendingsGlobalDataObject,
      balanceGlobalDataObject
    ])

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
  const datasetChartLineBalance: ChartData = {
    labels: calcMonts(),
    datasets: balanceConfig
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Cálculos e previsões</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderPage />
      {/* <CarrousselCreditCard /> */}
      <TableDatas
        displayButtons={false}
        titleTable='Projeção de 12 meses'
        dataTable={projectionData}
        functionEditLineTable={() => { }}
        functionExclude={() => { }}
        keyComponent={1}
      />
      <section className={styles.sectionChartsGrid}>
        {datasetConfig[0] ? <LineChart titleChart='Gastos Mensais' datasetChartLine={datasetChartLine} /> : <div></div>}
        {balanceConfig[0] ? <LineChart titleChart='Saldo no final do mês' datasetChartLine={datasetChartLineBalance} /> : <div></div>}
      </section>
    </div>
  )
}

export default Home
