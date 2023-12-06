const { expect } = require("chai");
const hre = require("hardhat");

describe("Koin", function() {
    // get contract
    
    async function getThings() {
      const ContractFactory = await hre.ethers.getContractFactory("Koin");
      [owner, addr1, addr2] = await hre.ethers.getSigners();
      const Contract = await ContractFactory.deploy();

      return {Contract, owner, addr1, addr2}
    }


    // deployment
    describe("deployment", () => {
        it("Should set the right owner", async function () {
          const {Contract, owner, addr1, addr2} = await getThings();
            expect(await Contract.owner()).to.equal(owner.address);
          });
      
          it("Should assign the total supply of tokens to the owner", async function () {
            const {Contract, owner, addr1, addr2} = await getThings();
            const ownerBalance = await Contract.balanceOf(owner.address);
            expect(await Contract.totalSupply()).to.equal(ownerBalance);
          });
    })

    // transaction
    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
          const {Contract, owner, addr1, addr2} = await getThings();
          // Transfer 50 tokens from owner to addr1
          await Contract.transfer(addr1.address, 50);
          const addr1Balance = await Contract.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(50);
    
          // Transfer 50 tokens from addr1 to addr2
          // We use .connect(signer) to send a transaction from another account
          await Contract.connect(addr1).transfer(addr2.address, 50);
          const addr2Balance = await Contract.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(50);
        });
    
        it("Should fail if sender doesn't have enough tokens", async function () {
          const {Contract, owner, addr1, addr2} = await getThings();
          const initialOwnerBalance = await Contract.balanceOf(owner.address);
          // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
          // `require` will evaluate false and revert the transaction.
          await expect(
            Contract.connect(addr1).transfer(owner.address, 1)
          ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    
          // Owner balance shouldn't have changed.
          expect(await Contract.balanceOf(owner.address)).to.equal(
            initialOwnerBalance
          );
        })
    })
})