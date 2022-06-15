import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";
import { Button, NumberInput, NumberInputField, FormControl, FormLabel, Text, Link, Heading } from '@chakra-ui/react'
import { BadgeTokenABI } from "abi/BadgeTokenABI"
import { TransactionResponse, TransactionReceipt } from "@ethersproject/providers"

interface Props {
    addressContract: string
}

enum CHECK_AVAILABLE {
  Uncheck,
  Checking,
  Available,
  UnAvailable
}

enum MINT_STATUS{
  Normal,
  Pending,
  Success
}

export default function MintNFT(props:Props){
  const addressContract = props.addressContract
  const [tokenId,setTokenId]=useState<number>(0)
  const [statusTokenCheck,setStatusTokenCheck] = useState<CHECK_AVAILABLE>(CHECK_AVAILABLE.Uncheck)
  const [statusMint, setStatusMint] = useState< MINT_STATUS>(MINT_STATUS.Normal)

  const { account, active, library} = useWeb3React<Web3Provider>()

  async function mint(event:React.FormEvent) {
    event.preventDefault()
    if(!(active && account && library)) return

    const token = new Contract(addressContract, BadgeTokenABI, library.getSigner());
    token.mintTo(tokenId).then((response:TransactionResponse)=>{

      setStatusMint(MINT_STATUS.Pending)
      
      setStatusTokenCheck(CHECK_AVAILABLE.Uncheck)

      console.log(response)//can we use response.wait() here?

    })
    .catch('error', console.error)
  }



  const handleChange = (value:string) => {
    let num = Number(value)
    if(num >= 1000) num =999

    setTokenId(num)
    setStatusTokenCheck(CHECK_AVAILABLE.Uncheck)
    setStatusMint(MINT_STATUS.Normal)
    // console.log(num)
  }



  const checkAvailable = (event:React.FormEvent)=>{
    event.preventDefault()

    if(!(active && account && library)) return

    setStatusTokenCheck(CHECK_AVAILABLE.Checking)

    const token = new Contract(addressContract, BadgeTokenABI, library);

    library.getCode(addressContract).then((result:string)=>{
      //check whether it is a contract
      if(result === '0x') return

      token.ownerOf(tokenId).then((result:string)=>{

        setStatusTokenCheck(CHECK_AVAILABLE.UnAvailable)

      }).catch((Error: any)=>{
        console.log(Error)

        setStatusTokenCheck(CHECK_AVAILABLE.Available)

      })

    })

    console.log("checkAvailable")
  }


useEffect(() => {
    if(statusMint != MINT_STATUS.Pending) return

    if(!(active && account && library)) return

    const token = new Contract(addressContract, BadgeTokenABI, library);

    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)

    const toMe = token.filters.Transfer(null, account)
    token.on(toMe, (from, to, amount, event) => {
        console.log('Transfer|received', { from, to, amount, event })
        setStatusMint(MINT_STATUS.Success)

        // mutate(undefined, true)
    })

    // remove listener when the component is unmounted
    return () => {
        token.removeAllListeners(toMe)
    }
    
  }, [statusMint])




  const renderCheckSwitch =(param:CHECK_AVAILABLE)=> {
    switch(param) {
      case CHECK_AVAILABLE.Available:
        return '你输入的 tokenID 可用';
      case CHECK_AVAILABLE.UnAvailable:
        return '你输入的 tokenID 不可用';
      case CHECK_AVAILABLE.Checking:
        return '检查中，等待链上反馈...';
      default:
        return '请先检查是否可用 （tokenID 需唯一，不可重复）';
    }
  }  



  const renderMintSwitch =(param:MINT_STATUS)=> {
    switch(param) {
      case MINT_STATUS.Pending:
        return 'Pending Mint NFT操作执行中';
      case MINT_STATUS.Success:
        return 'Sucess Mint NFT成功';
      default:
        return 'mint 成功后可在 Opensea 查看（不先检查 tokenID 直接 mint ，可能不能成功）';
    }
  }  



  return (
    <div>
      <Heading my={4}  fontSize='3xl' as='h2'>Mint NFT </Heading>
      <Text fontSize='md' mb={8}>获取一个 🥝 Web3Elite (WE) NFT 🥝，这一 Polygon 链 NFT 的图片为助记词单词。</Text>

      <form onSubmit={mint}>
        <FormControl>
          <FormLabel mb={4} fontSize='xl' >输入 0-999 之间的数字 </FormLabel>
          <FormLabel mb={4} >这个数字将是你的 NFT 的 tokenID，若某数字对应的 NFT 已存在，你将不能成功 mint。 </FormLabel>

            <NumberInput size='lg' maxW={32}  my={2} 
              defaultValue={tokenId} value ={tokenId} onChange={handleChange}  >
              <NumberInputField />
            </NumberInput>

            <FormLabel mt={8} fontSize='xl'>1. 先检查 tokenID 是否可用 </FormLabel>

            <Button my={2} size='lg' onClick={checkAvailable} isDisabled={!account }>
                Check
            </Button>

            <Text mb={4} >{renderCheckSwitch(statusTokenCheck)} </Text>

            <FormLabel mt={8} fontSize='xl' >2. 再按 Mint NFT（需要钱包中有 MATIC）  </FormLabel>

            <Button my={2} type="submit" size='lg' colorScheme='messenger' isDisabled={!account  }>
                Mint NFT
            </Button>

            <Text mb={4} >{renderMintSwitch(statusMint)} </Text>
            <Link href='https://opensea.io/collection/web3elite-v2' isExternal color='teal.500'>
            OpenSea 查看 Web3Elite NFT ( 成功 mint 后，通常需稍等片刻，才可在 Opensea 上看到。)
            </Link>
        </FormControl>
      </form>
    </div>
  )
  
}
