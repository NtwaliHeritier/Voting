import React, { useEffect, useState } from "react";
import ElectionContract from "./contracts/Election.json";

import "./App.css";
import Web3 from "web3";
import Navbar from "./components/Navbar";
import Form from "./components/Form";

const App = () => {
  
  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
    window.ethereum.on('accountsChanged', (accounts) => setAccounts(accounts))
  }, []);

  const [accounts, setAccounts] = useState("");
  const [contract, setContract] = useState("");
  const [loader, setLoader] = useState(true);
  const [candidate1, setCandidate1] = useState({});
  const [candidate2, setCandidate2] = useState({});

    const loadWeb3 = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-ethereum browser detected");
    }
  };

  const loadBlockChainData = async () => {
    // window.ethereum.on('accountsChanged', (accounts) => setAccounts(accounts));
    setLoader(true);
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = ElectionContract.networks[networkId];
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    if(networkData) {
      const election = await new web3.eth.Contract(ElectionContract.abi, networkData.address);
      const candidate1 = await election.methods.candidate_votes(1).call();
      setCandidate1(candidate1);
      const candidate2 = await election.methods.candidate_votes(2).call();
      setCandidate2(candidate2);
      setContract(election);
      setLoader(false);
    } else {
      window.alert("The smart is not deployed on this network");
    }
  }

  const vote = async (id) => {
    setLoader(true);
    await contract.methods.vote(id).send({from: accounts[0]});
    setCandidate1(await contract.methods.candidate_votes(1).call());
    setCandidate2(await contract.methods.candidate_votes(2).call());
    setLoader(false);
  }

  if(loader) {
    return <div>Loading....</div>
  }

    return (
      <div className="App">
        <Navbar account = {accounts[0]}/>
        <Form candidate1 = {candidate1} candidate2 = {candidate2} vote = {vote}/>
      </div>
    );
}
 
export default App;
