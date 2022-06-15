// src/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import theme from '../theme/theme'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider  theme={theme}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default MyApp