const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
async function deployFunction({ getNamedAccounts, deployments }) {
    const { log, deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let ethusdPriceFeedAddress;
    console.log("Netwokr name", network.name)
    if (developmentChains.includes(network.name)) {
        const latestTransaction = await deployments.get("MockV3Aggregator")
        ethusdPriceFeedAddress = latestTransaction.address
        console.log("Address is", ethusdPriceFeedAddress)
    } else {
        ethusdPriceFeedAddress = networkConfig[chainId]['ethusdPriceFeedAddress']
        console.log("Address is not", ethusdPriceFeedAddress)

    }

    const fundMe = await deploy("FundMe", {
        from: deployer, args: [ethusdPriceFeedAddress], log: true, waitConfirmations: network.config.blockConfirmations || 1
    })

    if (!developmentChains.includes(network.name)) {
        await verify(fundMe.address, [ethusdPriceFeedAddress])
    }
}
module.exports.default = deployFunction
module.exports.tags = ["all", "fundme"]