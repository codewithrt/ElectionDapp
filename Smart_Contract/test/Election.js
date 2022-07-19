const {loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const { expect } = require("chai");


describe("Election",async()=>{
   
    async function allelements(){
        let Election = await ethers.getContractFactory("Election")
        let election = await Election.deploy();
        return {election}
     }
        describe("Candidates",async()=>{
            it("three candidates deployed ",async()=>{
               const {election} = await loadFixture(allelements)
               const count = await election.candidatecount()
               console.log(count.toNumber());
               expect(count.toNumber()).to.be.equal(3)
            }) 
       })

       describe("It intialize the candidate with correct values",async()=>{
        it("All candidates ",async()=>{
           const {election} = await loadFixture(allelements)
           const candidates1 = await election.Candidates(1)
        //    console.log(candidates1);
           expect((candidates1.id).toNumber()).to.be.equal(1)
           expect((candidates1.name).toString()).to.be.equal("Candidate 1")
           expect((candidates1.votecount).toNumber()).to.be.equal(0)
           const candidates2 = await election.Candidates(2)
        //    console.log(candidates2);
           expect((candidates2.id).toNumber()).to.be.equal(2)
           expect((candidates2.name).toString()).to.be.equal("Candidate 2")
           expect((candidates2.votecount).toNumber()).to.be.equal(0)
           const candidates3 = await election.Candidates(3)
        //    console.log(candidates3);
           expect((candidates3.id).toNumber()).to.be.equal(3)
           expect((candidates3.name).toString()).to.be.equal("Candidate 3")
           expect((candidates3.votecount).toNumber()).to.be.equal(0)
        }) 
   })
})

