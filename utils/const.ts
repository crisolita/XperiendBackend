const contract =require("../Sale.json")
const tokenERC20 =require("../XperiendToken.json")
const stake =require("../StakeXperiend.json")
const nft =require("../XperiendNFT.json")




export const SALE_CONTRACT_ABI = contract.abi;
export const SALE_CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || contract.address;
  
  export const ERC20_CONTRACT_ABI = tokenERC20.abi;
  export const ERC20_CONTRACT_ADDRESS =
    process.env.ERC20_CONTRACT_ADDRESS || tokenERC20.address;
  
    
    export const STAKE_CONTRACT_ABI = stake.abi;
    export const STAKE_CONTRACT_ADDRESS =
      process.env.STAKE_CONTRACT_ADDRESS || stake.address;


      export const NFT_CONTRACT_ABI = nft.abi;
      export const NFT_CONTRACT_ADDRESS =
        process.env.NFT_CONTRACT_ADDRESS || nft.address;