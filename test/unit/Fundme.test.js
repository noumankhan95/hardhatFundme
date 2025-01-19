const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", () => {
    let fundMe;
    let mockV3Aggregator;

    beforeEach(async () => {
        const { deployer } = await getNamedAccounts();

        // Run all deployment scripts with the "all" tag
        await deployments.fixture(["all"]);

        // Get the deployed FundMe and MockV3Aggregator contract instances
        const fundMeDeployment = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address);

        const mockDeployment = await deployments.get("MockV3Aggregator");
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", mockDeployment.address);

        // Log the addresses for debugging
        console.log("FundMe deployed at:", fundMe);
        console.log("MockV3Aggregator deployed at:", mockV3Aggregator);
    });

    describe("constructor", () => {
        it("sets aggregator address correctly", async function () {
            // Directly access the pricefeed address
            const priceFeedAddress = await fundMe.pricefeed();

            // Compare it with mockV3Aggregator's address
            assert.equal(priceFeedAddress, mockV3Aggregator.target);
        });
    });
});
