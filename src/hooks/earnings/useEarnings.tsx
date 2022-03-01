import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import styles from './styles.module.scss'
import { ModalAddModule } from "../../components/ModalAddModule/ModalAddModule";
interface TableData {
    headerToTable: string,
    bodyToTable: number[]
}
interface EarningsProviderContextData {
    editLineTable: (index?: number, keyComponent?: number) => void,
    openModuleModal: () => void,
    excludeModuleModal: (index: number) => void,
    editModuleModal: (index: number) => void,
    openModal: (index: number) => void;
    modulesData: { title: string, earningsData: TableData[] }[]
}

interface EarningsProviderProps {
    children: ReactNode
}

const EarningsProviderContext = createContext<EarningsProviderContextData>({} as EarningsProviderContextData)
export function EarningsProvider({ children }: EarningsProviderProps): JSX.Element {
    const months: { name: string, value: boolean }[] = []
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalModuleIsOpen, setModuleIsOpen] = useState(false);
    const [recorrente, setRecorrente] = useState(true)

    const [rendaNome, setRendaNome] = useState<string>('')
    const [rendaValor, setRendaValor] = useState<number>(0)
    const [mesDeRepetição, setMesDeRepetição] = useState<{ name: string, value: boolean }[]>(months)

    const [modulesData, setModulesData] = useState<{ title: string, earningsData: TableData[] }[]>([])
    const [moduleName, setModuleName] = useState<{ title: string, index: number }>({} as { title: string, index: number })

    const [indexSelected, setIndexSelected] = useState(0)

    useEffect(() => {
        const earningsData = localStorage.getItem('EarningsData')
        if (earningsData) {
            setModulesData(JSON.parse(earningsData))
        }

    }, [])

    useEffect(() => {
        const monthsOnYear = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        for (let index = 0; index < monthsOnYear.length; index++) {
            const element = monthsOnYear[index];
            months.push({
                name: element,
                value: false
            })
        }
        setMesDeRepetição(months)
    }, [recorrente])

    function openModal(index: number) {
        setIndexSelected(index)
        setMesDeRepetição(months)
        setIsOpen(true);
        setRecorrente(true)
    }
    function closeModal() {
        setIsOpen(false);

        setRendaNome('')
        setRecorrente(true)
        setRendaValor(0)
        setMesDeRepetição(months)

    }
    function editLineTable(index?: number, keyComponent?: number) {
        console.log(index, keyComponent);

        const indexSelected = Number(index) ?? index
        const keySelected = Number(keyComponent) ?? keyComponent
        if (indexSelected >= 0 && keySelected >= 0) {
            const newArray = [...modulesData]
            newArray[keySelected]?.earningsData.splice(indexSelected, 1)
            setModulesData(newArray)

            localStorage.setItem('EarningsData', JSON.stringify(newArray))
        }
    }

    // Functions Module

    function closeModuleModal() {
        setModuleIsOpen(false)
    }
    function openModuleModal() {
        setModuleIsOpen(true)
    }
    function saveModuleModal(title: string, index?: number) {
        const indexSelected = Number(index) ?? index
        if (indexSelected >= 0) {
            const newArrayData = [...modulesData]
            newArrayData[indexSelected] = { ...newArrayData[indexSelected], title: title }
            setModulesData(newArrayData)
            setModuleName({} as { title: string, index: number })
            localStorage.setItem('EarningsData', JSON.stringify(newArrayData))
        } else {
            setModulesData([...modulesData, { title: title, earningsData: [] }])
            localStorage.setItem('EarningsData', JSON.stringify([...modulesData, { title: title, earningsData: [] }]))
        }


        closeModuleModal()

    }
    function excludeModuleModal(index: number) {
        const newArray = [...modulesData]
        newArray.splice(index, 1)
        setModulesData(newArray)

        localStorage.setItem('EarningsData', JSON.stringify(newArray))
    }
    function editModuleModal(index: number) {
        setModuleName({ title: modulesData[index].title, index })
        setModuleIsOpen(true)
    }



    function saveFormData(e: any) {
        e.preventDefault()
        const values: number[] = []
        if (recorrente) {
            for (let index = 0; index < 12; index++) {
                values.push(rendaValor)

            }
        } else {
            for (let index = 0; index < mesDeRepetição.length; index++) {
                const element = mesDeRepetição[index]
                element.value ? values.push(rendaValor) : values.push(0)
            }
        }
        modulesData[indexSelected]?.earningsData.push({ headerToTable: rendaNome, bodyToTable: values })
        localStorage.setItem('EarningsData', JSON.stringify(modulesData))
        closeModal()
    }
    return (
        <EarningsProviderContext.Provider value={{
            editLineTable, editModuleModal, excludeModuleModal, openModuleModal, openModal, modulesData
        }}>
            {children}
            <ModalAddModule
                titleModuleextern={moduleName.title}
                index={moduleName.index}
                closeModal={closeModuleModal}
                modalIsOpen={modalModuleIsOpen}
                saveFormData={saveModuleModal}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                // style={customStyles}
                className={styles.modalContainer}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}><CgClose /></button>

                <form className={styles.formModal} onSubmit={e => saveFormData(e)}>
                    <fieldset>
                        <legend><h2>Adicionar Ganho</h2></legend>
                        <label>Qual o nome dessa renda?</label>
                        <input type={'text'} value={rendaNome} onChange={e => setRendaNome(e.target.value)} />
                        <label>Qual o valor?</label>
                        <input type={'number'} value={rendaValor} onChange={e => setRendaValor(Number(e.target.value))} />
                        <div>
                            <input checked={recorrente} type="checkbox" onChange={() => {
                                setRecorrente(!recorrente)
                            }} />
                            <label>É fixa? (ganha todo mês)</label>
                        </div>
                        {recorrente ? <div /> :
                            <div>
                                <label><strong>Em quais meses cairá?</strong></label>
                                <div className={styles.gridMonth}>
                                    {mesDeRepetição.map((mes, index) =>
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    const newMonth = mesDeRepetição
                                                    newMonth[index].value = !newMonth[index].value
                                                    setMesDeRepetição(newMonth)
                                                }}
                                                id={mes.name}
                                                name={mes.name} />
                                            <label htmlFor={mes.name}>{mes.name}</label>
                                        </div>)}
                                </div>
                            </div>}
                        <button type='submit'>Salvar</button>

                    </fieldset>
                </form>
            </Modal>
        </EarningsProviderContext.Provider>
    )
}

export function useEarnings(): EarningsProviderContextData {
    const context = useContext(EarningsProviderContext)

    return context
}