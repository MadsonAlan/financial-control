import { CreditCard } from "./CreditCard/CreditCard";
import styles from './styles.module.scss';
import Slider, { Settings } from 'react-slick';
export function CarrousselCreditCard() {
    const settings: Settings = {
        className: "center",
        centerMode: true,
        centerPadding: '1.5rem',
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    }
    return (
        <div className={styles.carrousselCreditCard}>
            <Slider {...settings}>
                <div>
                    <CreditCard />
                </div>
                <div>
                    <CreditCard />
                </div>
                <div>
                    <CreditCard />
                </div>
                <div>
                    <CreditCard />
                </div>
                <div>
                    <CreditCard />
                </div>
            </Slider>
        </div>
    )
}