import { ethers } from "ethers";
import {
  ERC20_CONTRACT_ABI,
  ERC20_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  SALE_CONTRACT_ABI,
  SALE_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ABI,
  STAKE_CONTRACT_ADDRESS,
} from "../utils/const";
const API_KEY_BSC = process.env.API_KEY_BSC;
const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER as string
);
const signer = provider.getSigner(process.env.SIGNER as string);
const wallet = new ethers.Wallet(process.env.ADMINPRIV as string, provider);
export const saleContract = new ethers.Contract(
  SALE_CONTRACT_ADDRESS,
  SALE_CONTRACT_ABI,
  signer
).connect(wallet);

export const XRENContract = new ethers.Contract(
  ERC20_CONTRACT_ADDRESS,
  ERC20_CONTRACT_ABI,
  signer
).connect(wallet);
export const StakeContract = new ethers.Contract(
  STAKE_CONTRACT_ADDRESS,
  STAKE_CONTRACT_ABI,
  signer
).connect(wallet);

export const xperiendNFT = new ethers.Contract(
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
  signer
).connect(wallet);
