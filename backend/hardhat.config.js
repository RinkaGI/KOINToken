require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  networks: {
    sepolia: {
      url: process.env.INFURA_SEPOLIA_KEY,
      accounts: [
        process.env.METAMASK_PRIVATE_KEY
      ]
    }
  }
};