import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from 'next-themes'
import {SessionProvider} from 'next-auth/react'
import Header from '../components/Header'

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
      <ThemeProvider attribute='class'>
        <div className='h-screen overflow-y-scroll bg-slate-200'>
          <Header/>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>

  )
}

export default MyApp
