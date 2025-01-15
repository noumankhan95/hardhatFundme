require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_API,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};


