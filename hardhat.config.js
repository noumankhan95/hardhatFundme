require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_API,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmation: 6
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },etherscan:{
    apiKey:process.env.ETHERSCAN_API
  }
};


