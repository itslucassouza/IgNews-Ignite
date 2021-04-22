import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProider } from 'next-auth/client'

import '../styles/global.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProider session={pageProps.session}>
    <Header />
    <Component {...pageProps} />
    </NextAuthProider>
  )
}

export default MyApp;
