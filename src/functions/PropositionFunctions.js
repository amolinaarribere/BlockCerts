// Proposition
export var PropositionLifeTime = "";
export var PropositionThreshold = "";
export var MinToPropose = "";

export var PendingPropositionLifeTime = "";
export var PendingPropositionThreshold = "";
export var PendingMinToPropose = "";

export var ContractName = ""
export var ContractVersion = ""
  
  export async function RetrievePendingProposition(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingPropositionLifeTime = "-";
      PendingPropositionThreshold = "-";
      PendingMinToPropose = "-";

      if(response[0] != undefined)PendingPropositionLifeTime = Number(response[0]);
      if(response[1] != undefined)PendingPropositionThreshold = Number(response[1]);
      if(response[2] != undefined)PendingMinToPropose = Number(response[2]);
    }
    catch(e) { 
      window.alert("error retrieving the pending propositions : " + JSON.stringify(e)); 
    }
    
  }
  
  export async function RetrieveProposition(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();
      PropositionLifeTime = response[0];
      PropositionThreshold = response[1];
      MinToPropose = response[2];
    }
    catch(e) { 
      window.alert("error retrieving the propositions : " + JSON.stringify(e)); 
    }
    
  }



  
