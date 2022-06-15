// src/pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box} from "@chakra-ui/layout"
import { addressContract }  from '../constants'
import MintNFT from 'components/MintNFT'
import ConnectMetamask from 'components/ConnectMetamask'

const Home: NextPage = () => {
  // const addressContract='0x5fbdb2315678afecb367f032d93f642f64180aa3'

  return (
    <>
      <Head>
        <title>Web3 Elites</title>
      </Head>

      <Heading as="h3"  my={4}>Web3 Elites 训练营</Heading> 
      <ConnectMetamask />

      <VStack >

        <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg" bg="MidnightBlue">
          <MintNFT addressContract={addressContract} />
        </Box>
      </VStack>
    </>
  )
}

export default Home
