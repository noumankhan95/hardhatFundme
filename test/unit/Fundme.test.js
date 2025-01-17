const { deployments, ethers, getNamedAccounts } = require("ethers")
const { assert } = require('chai')
describe("FundMe", () => {
    let FundMe;
    let deployer;
    let mockV3Aggregator
    beforeEach(async () => {
        const { deployer } = getNamedAccounts()
        await deployments.fixture(['all'])
        FundMe = await ethers.getContract('FundMe', deployer);
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })
    describe("constructor", async () => {
        it("sets aggregator address correctly", async function () {
            const response = await FundMe.priceFeed();
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})