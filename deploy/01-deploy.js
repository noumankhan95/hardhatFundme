const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
async function deployFunction({ getNamedAccounts, deployments }) {
    const { log, deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let ethusdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const latestTransaction = await deployments.get("MockV3Aggregator")
        ethusdPriceFeedAddress = latestTransaction.address
    } else {
        ethusdPriceFeedAddress = networkConfig[chainId]['ethusdPriceFeedAddress']
    }

    const fundMe = await deploy("FundMe", {
        from: deployer, args: [ethusdPriceFeedAddress], log: true
    })

    if (!developmentChains.includes(network.name)) {
        await verify(fundMe.address, [ethusdPriceFeedAddress])
    }
}
module.exports.default = deployFunction
module.exports.tags = ["all", "fundme"]