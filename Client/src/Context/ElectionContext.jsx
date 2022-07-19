import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Contract_Address, Contract_ABI } from "../utils/Constants";

export const ElectionContext = createContext();
const { ethereum } = window;

const getcontract = () => {
  const Provider = new ethers.providers.Web3Provider(ethereum);
  const Signer = Provider.getSigner();
  const ElectionContract = new ethers.Contract(
    Contract_Address,
    Contract_ABI,
    Signer
  );
  console.log(Provider, Signer, ElectionContract);
  return { Provider, Signer, ElectionContract };
};

const ElectionProvider = (children) => {
  const [CurrentAccount, setCurrentAccount] = useState("");
  const [count, setcount] = useState(0);
  const [arrays, setarrays] = useState([])
  const [SelectedCand, setSelectedCand] = useState(0)
  const [votearray, setvotearray] = useState([])

  let array = [];
  let vote =[];

  // TO CHeck is wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getCandidates();
      } else {
        console.log("no ethreum accounts");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // to connect Wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
      checkIfWalletIsConnected();
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };
        // Get all candidates information leaving vote count
  const getCandidates = async () => {
    const { ElectionContract } = getcontract();
    const candidatescount = await ElectionContract.candidatecount();
    const Candidcount = candidatescount.toNumber();
    console.log(Candidcount);
    // getting candidates
    const candidates1 = await ElectionContract.Candidates(1);
    console.log(candidates1);
    for (let i = 1; i <= Candidcount; i++) {
      const cand = await ElectionContract.Candidates(i);
      array.push(cand);
    }
    setarrays(array)
    // Showresult();
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
    // On clicking vote what happens
  const onVote = async () =>{
    const { ElectionContract } = getcontract();
    console.log(SelectedCand);
    const hash = await ElectionContract.vote(SelectedCand);
    console.log(hash);
    const votecount = await ElectionContract.Candidates(1);
    console.log(votecount);
    // Showresult();
  }
//   On clicking show results
    const Showresult = async()=>{
        const { ElectionContract } = getcontract();
        const candidatescount = await ElectionContract.candidatecount();
    const Candidcount = candidatescount.toNumber();
        for (let i = 1; i <= Candidcount; i++) {
            const cand = await ElectionContract.Candidates(i);
           vote.push(cand);
          }
          setvotearray(vote)
    }

  return (
    <ElectionContext.Provider value={{ connectWallet, arrays,CurrentAccount,setSelectedCand,onVote,votearray,Showresult }} {...children} />
  );
};

export { ElectionProvider };
