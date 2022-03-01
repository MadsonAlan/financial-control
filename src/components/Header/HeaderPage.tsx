import Link from 'next/link'
import styles from './styles.module.scss'

export function HeaderPage() {
    return (
        <nav className={styles.header}>
            <section>
                <ul className={styles.menu}>
                    <li>
                        <Link href='/'>
                            <a>Cálculos e Previsões</a>
                        </Link>
                        <Link href='/earnings'>
                            <a>Ganhos</a>
                        </Link>
                        <Link href='/spending'>
                            <a>Gastos</a>
                        </Link>
                        <Link href='/creditcards'>
                            <a>Cartões</a>
                        </Link>
                    </li>
                </ul>
            </section>
        </nav>
    )
}