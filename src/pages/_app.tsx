import '../styles/globals.scss'
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import type { AppProps } from 'next/app'
import { EarningsProvider } from '../hooks/earnings/useEarnings';
import { SpendingsProvider } from '../hooks/spendings/useSpendings';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EarningsProvider>
      <SpendingsProvider>
        <Component {...pageProps} />
      </SpendingsProvider>
    </EarningsProvider>
  )
}

export default MyApp
