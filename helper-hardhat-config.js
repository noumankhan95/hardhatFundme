const networkConfig = {
    11155111: {
        name: "Sepolia",
        ethusdPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}
const developmentChains = ["hardhat", "local"]
const DECIMALS = 8
const INITIAL = 30000000000000
module.exports = {
    networkConfig, developmentChains, DECIMALS, INITIAL
}