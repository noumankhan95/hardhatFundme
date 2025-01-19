const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

describe("FundMe", () => {
    let fundMe;
    let mockV3Aggregator;
    let deployer;
    const sendValue = ethers.parseEther("1")
    beforeEach(async () => {
        ({ deployer } = await getNamedAccounts());

        // Run all deployment scripts with the "all" tag
        await deployments.fixture(["all"]);

        // Get the deployed FundMe and MockV3Aggregator contract instances
        const fundMeDeployment = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address);

        const mockDeployment = await deployments.get("MockV3Aggregator");
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", mockDeployment.address);

        // Log the addresses for debugging
        // console.log("FundMe deployed at:", fundMe);
        // console.log("MockV3Aggregator deployed at:", mockV3Aggregator);
    });

    describe("constructor", () => {
        it("sets aggregator address correctly", async function () {
            // Directly access the pricefeed address
            const priceFeedAddress = await fundMe.pricefeed();

            // Compare it with mockV3Aggregator's address
            assert.equal(priceFeedAddress, mockV3Aggregator.target);
        });
    });

    describe("fund", () => {
        it("Fails if not enough eth", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")

        })
        it("Sends Eth to update Amount", async () => {
            await expect(fundMe.fund({ value: sendValue }))
            const response = await fundMe.addressToAmountFunded(deployer)
            assert(response.toString(), sendValue.toString())
        })
    })

    describe("withdraw", () => {
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue })
        })
        it("withdraw from single founder", async () => {
            const startingBalance = await ethers.provider.getBalance(fundMe.target)
            const startingDeployerBalance = await ethers.provider.getBalance(deployer)
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, gasPrice } = transactionReceipt
            console.log(transactionReceipt.effectiveGasPrice, "receipt")
            const endingBalance = await ethers.provider.getBalance(fundMe.target)
            const endingDeployerBalance = await ethers.provider.getBalance(deployer)
            const gasCost = BigInt(gasUsed) * BigInt(gasPrice);
            assert.equal(endingBalance, BigInt(0)); // BigInt comparison
            assert.equal(
                BigInt(startingBalance + startingDeployerBalance).toString(),
                (BigInt(endingDeployerBalance) + BigInt(gasCost)).toString()
            );
        })
    })
});
