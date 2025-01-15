const { run } = require("hardhat")


const verify = async (address, args) => {
    try {
        await run("verify:verify", {
            address,
            args
        })
    } catch (e) {
        if (e.toLowerCase().includes("already verified")) {
            console.log("Verified Already")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }