import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CgPlayListAdd, CgTrash } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { calcMonts } from '../../config/calcMonths';
import styles from './styles.module.scss';

interface PropsTableDatas {
    titleTable: string
    keyComponent: number
    dataTable: { headerToTable: string, bodyToTable: number[] }[]
    functionAdd?: () => void
    functionExclude: () => void
    functionEdit?: () => void
    functionEditLineTable: (index: number, keyComponent: number) => void
}
export function TableDatas({ keyComponent, titleTable, dataTable, functionAdd, functionExclude, functionEdit, functionEditLineTable }: PropsTableDatas) {
    const [oneYearRange, setOneYearRange] = useState<string[]>([])
    const [indexSelected, setIndexSelected] = useState<number>(0)
    const [selected, setSelected] = useState('')
    const d = new Date()

    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    const [modalEditLineIsOpen, setEditLineIsOpen] = useState(false);

    function closeEditLine() {
        setEditLineIsOpen(false);
    }

    useEffect(() => {
        setOneYearRange(calcMonts())
    }, [])

    function arrayForNowMonth(arrayData: number[]) {
        const newArrayData = []
        for (let index = 0; index < arrayData.length; index++) {
            newArrayData.push(arrayData[(index + d.getMonth()) < 12 ? (index + d.getMonth()) : ((index + d.getMonth()) - 12)])
        }
        return newArrayData
    }

    return (
        <div className={styles.tableContainer}>
            <div>
                <button onClick={functionEdit}><h2>{titleTable} <AiOutlineEdit /></h2></button>
                <button className={styles.buttonExcludeModule} onClick={() => setIsOpen(true)}><CgTrash /> Excluir seção</button>
            </div>
            <table>
                <tr>
                    <th>Em 1 ano</th>
                    {oneYearRange.map((month, index) => <th key={index}>{month}</th>)}
                </tr>
                {
                    dataTable?.map((data, index) =>
                        <tr key={index}>
                            <th onClick={() => {
                                setIndexSelected(index)
                                setSelected(data.headerToTable)
                                setEditLineIsOpen(true)
                            }}>
                                {data.headerToTable}
                            </th>
                            {
                                arrayForNowMonth(data.bodyToTable).map((body, index) =>
                                    <td key={index}>
                                        {body.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                )
                            }
                        </tr>
                    )
                }

                <tr>
                    <th>Saldo</th>
                    <td></td>
                </tr>

            </table>
            <div className={styles.addButton}>
                <button onClick={functionAdd}><CgPlayListAdd />Adicionar novo</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                // style={customStyles}
                className={styles.modalContainer}
                contentLabel="Exclude Module"
            >
                <h3>Você deseja mesmo excluir o módulo: <span>{titleTable}</span>?</h3>
                <div>
                    <button onClick={() => {
                        functionExclude()
                        closeModal()
                    }}>Excluir</button>
                    <button onClick={closeModal}>Cancelar</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalEditLineIsOpen}
                onRequestClose={closeEditLine}
                // style={customStyles}
                className={styles.modalContainer}
                contentLabel="Exclude Line Module"
            >
                <h3>Você deseja mesmo excluir: <span>{selected}</span> do modulo {titleTable}?</h3>
                <div>
                    <button onClick={() => {
                        functionEditLineTable(indexSelected, keyComponent)
                        closeEditLine()
                    }}>Excluir</button>
                    <button onClick={closeEditLine}>Cancelar</button>
                </div>
            </Modal>
        </div >
    )
}