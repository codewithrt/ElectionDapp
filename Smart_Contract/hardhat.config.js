require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.14",
  networks:{
    ganache:{
      url:'HTTP://127.0.0.1:7545',
      accounts:['e7b0998ed459c79bedd810cbc52689e5f72ef855d236c5224cbe2ead33c7b414']
    }
  }
};
