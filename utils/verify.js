const { run } = require("hardhat")


const verify = async (address, args) => {
    try {
        await run("verify:verify", {
            address,
            args
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { verify }