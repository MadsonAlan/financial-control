import Head from "next/head";
import { HeaderPage } from "../../components/Header/HeaderPage";
import { TableDatas } from "../../components/TableDatas/TableDatas";
import { useSpendings } from "../../hooks/spendings/useSpendings";
import styles from "./styles.module.scss"

export default function SpendingPage() {
    const {
        editLineTable,
        editModuleModal,
        excludeModuleModal,
        openModuleModal,
        openModal,
        modulesData
    } = useSpendings()

    return (
        <div className={styles.container}>
            <Head>
                <title>Seus Gastos</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderPage />
            <button onClick={openModuleModal}>Adicionar tipo de gasto</button>
            {modulesData.map((module, index) =>
                <TableDatas
                    key={index}
                    keyComponent={index}
                    titleTable={module.title}
                    dataTable={module.spendingsData}
                    functionAdd={() => openModal(index)}
                    functionExclude={() => excludeModuleModal(index)}
                    functionEdit={() => editModuleModal(index)}
                    functionEditLineTable={editLineTable}

                />
            )}
        </div>
    )
}