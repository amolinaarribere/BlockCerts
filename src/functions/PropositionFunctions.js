// Proposition
const Aux = require("./AuxiliaryFunctions.js");
const ENSFunc = require("./ENSFunctions.js");


export var CurrentPropositionID = ""

export var PropositionLifeTime = "";
export var PropositionThresholdPercentage = "";
export var MinWeightToProposePercentage = "";

export var PendingPropositionLifeTime = "";
export var PendingPropositionThresholdPercentage = "";
export var PendingMinWeightToProposePercentage = "";

export var ContractName = ""
export var ContractVersion = ""

export async function UpgradeProposition(NewPropositionLifeTime, NewPropositionThresholdPercentage, NewMinWeightToProposePercentage, contract){
  await Aux.CallBackFrame(contract.methods.sendProposition([Aux.IntToBytes32(NewPropositionLifeTime),
                            Aux.IntToBytes32(NewPropositionThresholdPercentage), 
                            Aux.IntToBytes32(NewMinWeightToProposePercentage)]).send({from: Aux.account }));
  }
  
  export async function VoteProposition(Vote, contract){
    await Aux.CallBackFrame(contract.methods.voteProposition(Vote).send({from: Aux.account }));
  }

  export async function VotePropositionOnBehalfOf(voter, PropID, Vote, nonce, deadline, signature, contract){
    window.alert("vote : " + Vote.toString())
    await Aux.CallBackFrame(contract.methods.votePropositionOnBehalfOf(voter, PropID, Vote, nonce, deadline, signature).send({from: Aux.account }));
  }
  
  export async function RetrievePendingProposition(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingPropositionLifeTime = "-";
      PendingPropositionThresholdPercentage = "-";
      PendingMinWeightToProposePercentage = "-";

      if(response[0] != undefined)PendingPropositionLifeTime = Number(response[0]);
      if(response[1] != undefined)PendingPropositionThresholdPercentage = Number(response[1]);
      if(response[2] != undefined)PendingMinWeightToProposePercentage = Number(response[2]);
    }
    catch(e) { 
      window.alert("error retrieving the pending propositions : " + JSON.stringify(e)); 
    }
    
  }
  
  export async function RetrieveProposition(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();
      PropositionLifeTime = response[0];
      PropositionThresholdPercentage = response[1];
      MinWeightToProposePercentage = response[2];
    }
    catch(e) { 
      window.alert("error retrieving the propositions : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePropositionID(contract){
    try{
      let response = await contract.methods.retrieveNextPropId().call();
      if(response > 0) CurrentPropositionID = response - 1;
    }
    catch(e) { 
      window.alert("error retrieving the current proposition ID : " + JSON.stringify(e)); 
    }
    
  }


  
