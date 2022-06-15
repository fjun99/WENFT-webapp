import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Box, Button, Text} from '@chakra-ui/react'
import { injected } from 'utils/connectors'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { formatAddress } from 'utils/helpers'

const ConnectMetamask = () => {

    const { chainId, account, activate,deactivate, setError, active,library ,connector} = useWeb3React<Web3Provider>()

    const onClickConnect = () => {
      activate(injected,(error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused")
        } else {
          setError(error)
        }
      }, false)
    }
    
    const onClickDisconnect = () => {
        deactivate()
      }
      
    useEffect(() => {
      console.log(chainId, account, active,library,connector)
    })
  
    return (
        <div>
        {active && typeof account === 'string' ? (
          <Box>  
            <Button type="button" w='100%' onClick={onClickDisconnect}>
                Account: {formatAddress(account,4)}
            </Button>
            <Text fontSize="sm" w='100%' my='2' align='center'>ChainID: {chainId} connected 已连接 Polygon 钱包</Text>
          </Box>
        ) : (
          <Box>
            <Button type="button" w='100%' onClick={onClickConnect}>
                先连接 🦊 MetaMask 钱包
            </Button>
            <Text fontSize="sm" w='100%' my='2' align='center'> not connected 未连接，请将钱包切换 Polygon 链，然后连接</Text>
        </Box>  

        )}
        </div>
    )
  }

export default ConnectMetamask
  