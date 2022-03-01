import styles from './styles.module.scss'
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';


interface ModalAddModuleProps {
    titleModuleextern?: string,
    index?: number,
    modalIsOpen: boolean,
    closeModal: () => void,
    saveFormData: (title: string, index?: number) => void
}
export function ModalAddModule({
    titleModuleextern,
    index,
    modalIsOpen,
    closeModal,
    saveFormData }: ModalAddModuleProps) {
    const [titleModule, setTtileModule] = useState<string>('')
    useEffect(() => {
        setTtileModule(titleModuleextern ? titleModuleextern : '')
    }, [titleModuleextern])
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            // style={customStyles}
            className={styles.modalContainer}
        >

            <button onClick={closeModal}><CgClose /></button>
            <form className={styles.formModal} onSubmit={e => {
                e.preventDefault()
                const value = titleModule
                setTtileModule('')
                saveFormData(value, index)
            }}>
                <fieldset>
                    <legend>
                        <h2>Adicionar modalidade</h2>
                    </legend>
                    <label>Qual será o titulo?</label>
                    <input type={'text'} value={titleModule} onChange={e => setTtileModule(e.target.value)} />
                    <button type='submit'>Adicionar</button>
                </fieldset>
            </form>
        </Modal>
    )
}