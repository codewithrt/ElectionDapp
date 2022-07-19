const hre = require("hardhat")

async function main(){
  let Election = await hre.ethers.getContractFactory("Election");
  let election = await Election.deploy();
  (await election).deployed;
  console.log("Election contract deployed",election.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  