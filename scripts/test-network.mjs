import hre from "hardhat";
import { ethers } from "ethers";

async function main() {
  console.log("Testing BlockDAG network connection...");
  
  try {
    // Get the current block number
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log("Current block number:", blockNumber);
    
    // Get the network name and chain ID
    const networkName = hre.network.name;
    const chainId = await hre.network.provider.send("eth_chainId");
    console.log("Network:", networkName);
    console.log("Chain ID:", parseInt(chainId, 16));
    
    // Get the first account
    const [signer] = await hre.ethers.getSigners();
    console.log("Connected account:", signer.address);
    
    // Get account balance
    const balance = await hre.ethers.provider.getBalance(signer.address);
    console.log("Account balance:", ethers.formatEther(balance), "BDAG");
  } catch (error) {
    console.error("Error connecting to the network:", error.message);
    console.error("Make sure your RPC URL and network settings are correct in hardhat.config.cjs");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
