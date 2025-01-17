const { run } = require("hardhat")


const verify = async (address, args) => {
    try {
        console.log("args", args)
        await run("verify:verify", {
            address,
            constructorArguments: args
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { verify }