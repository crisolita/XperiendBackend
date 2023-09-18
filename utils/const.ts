const contract =require("../Sale.json")

export const SALE_CONTRACT_ABI = contract.abi;
export const SALE_CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || contract.address;
