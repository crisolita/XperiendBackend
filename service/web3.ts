import { ethers } from "ethers";
import { ERC20_CONTRACT_ABI, ERC20_CONTRACT_ADDRESS, SALE_CONTRACT_ABI, SALE_CONTRACT_ADDRESS, STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESS } from "../utils/const";
import { PrismaClient } from "@prisma/client";
import axios from 'axios';
const API_KEY_BSC=process.env.API_KEY_BSC
const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER as string
);
const signer = provider.getSigner(process.env.SIGNER as string);
const wallet= new ethers.Wallet(process.env.ADMINPRIV as string,provider)
export const saleContract= (new ethers.Contract(SALE_CONTRACT_ADDRESS,SALE_CONTRACT_ABI,signer)).connect(wallet)

export const XRENContract= (new ethers.Contract(ERC20_CONTRACT_ADDRESS,ERC20_CONTRACT_ABI,signer)).connect(wallet)
export const StakeContract= (new ethers.Contract(STAKE_CONTRACT_ADDRESS,STAKE_CONTRACT_ABI,signer)).connect(wallet)



export const validateTx= async(hash:string,prisma:PrismaClient) => {
  const apiUrl = `https://api.bscscan.com/api?module=transaction&action=gettxinfo&txhash=${hash}&apikey=${API_KEY_BSC}`;
  axios.get(apiUrl)
  .then((response) => {
    const transactionDetails = response;
    console.log('Detalles de la transacción:', transactionDetails);
  })
  .catch((error) => {
    console.error('Error al consultar la transacción:', error);
  });
}