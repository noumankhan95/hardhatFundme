const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { developmentChains, DECIMALS, INITIAL } = require("../helper-hardhat-config")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { log, deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log("network Name", network.name)
    console.log("network Name", network.name)

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected ,Deploying Mocks")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL]
        })
        log("Mock Deployed")
    }

}
module.exports.tags = ["all", "mocks"]