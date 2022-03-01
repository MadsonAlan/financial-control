import Image from "next/image";
import VisaLogo from "../../../public/cardsLogo/visaLogo.svg"
import MastercardLogo from "../../../public/cardsLogo/mastercardLogo.svg"
import styles from "./styles.module.scss"
export function CreditCard() {
    return (
        <div className={styles.cardContainer}>
            <section className={styles.topSection}>
                <p>Madson Alan</p>
                <h2>R$ 100,00</h2>
            </section>
            <section className={styles.bottomSection}>
                <p>xxx xxx xxx xxx</p>
                <Image src={MastercardLogo} width="60%" height="60%" />
            </section>
        </div>
    )
}