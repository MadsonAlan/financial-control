import Head from "next/head";
import { HeaderPage } from "../../components/Header/HeaderPage";
import { TableDatas } from "../../components/TableDatas/TableDatas";
import { useEarnings } from "../../hooks/earnings/useEarnings";
import styles from "./styles.module.scss"
export default function EarningsPage() {
    const {
        editLineTable,
        editModuleModal,
        excludeModuleModal,
        openModuleModal,
        openModal,
        modulesData
    } = useEarnings()

    return (
        <div className={styles.container}>
            <Head>
                <title>Seus Ganhos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderPage />
            <button onClick={openModuleModal}>Adicionar ganho</button>
            {modulesData.map((module, index) =>
                <TableDatas
                    displayButtons={true}
                    key={index}
                    keyComponent={index}
                    titleTable={module.title}
                    dataTable={module.earningsData}
                    functionAdd={() => openModal(index)}
                    functionExclude={() => excludeModuleModal(index)}
                    functionEdit={() => editModuleModal(index)}
                    functionEditLineTable={editLineTable}
                />
            )}
        </div>
    )
}