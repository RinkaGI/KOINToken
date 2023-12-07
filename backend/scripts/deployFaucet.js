const hre = require('hardhat');

const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("Faucet")
  const Contract = await ContractFactory.deploy()

  console.log('KOIN Faucet Message: deploying...')

  await Contract.waitForDeployment()

  console.log("KOIN Faucet Message: Deployed at: ", await Contract.getAddress())
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain();