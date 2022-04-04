
const Aux = require("./AuxiliaryFunctions.js");
const certFunc = require("./CertisFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");

export var CurrentPropositionID = ""


export async function UpgradeProposition(NewPropositionBytesArray, contract){
    await Aux.CallBackFrame(contract.methods.sendProposition(NewPropositionBytesArray).send({from: Aux.account }));
}

export async function VoteProposition(Vote, contract){
    let CheckVote = ValidationFunc.validateBoolean(Vote);

    if(true == CheckVote) {
        await Aux.CallBackFrame(contract.methods.voteProposition(Vote).send({from: Aux.account }));
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckVote], ["Vote"]);
    }

}

export async function VotePropositionOnBehalfOf(voter, PropID, Vote, nonce, deadline, signature, contract){
    let CheckVoter = ValidationFunc.validateAddress(voter);
    let CheckPropID = ValidationFunc.validatePositiveLargeInteger(PropID);
    let CheckVote = ValidationFunc.validateBoolean(Vote);
    let CheckNonce = ValidationFunc.validatePositiveLargeInteger(nonce);
    let CheckDeadline = ValidationFunc.validatePositiveLargeInteger(deadline);
    let CheckSignature = ValidationFunc.validateSignature(signature);


    if(true == CheckVoter &&
        true == CheckPropID[1] &&
        true == CheckVote &&
        true == CheckNonce[1] &&
        true == CheckDeadline[1] &&
        true == CheckSignature) {
        await Aux.CallBackFrame(contract.methods.votePropositionOnBehalfOf(voter, CheckPropID[0], Vote, CheckNonce[0], CheckDeadline[0], signature).send({from: Aux.account }));
    }
    else{
        ValidationFunc.FormatErrorMessage([CheckVoter, CheckPropID[1], CheckVote, CheckNonce[1], CheckDeadline[1], CheckSignature], 
            ["Voter", "Propostion ID", "Vote", "Nonce", "Deadline", "Signature"]);
    }

}

export async function CancelProposition(contract){
    await Aux.CallBackFrame(contract.methods.cancelProposition().send({from: Aux.account }));
}

export async function PropositionStatus(contract){
    return await contract.methods.retrievePropositionStatus().call();
}

export async function PropositionRemainingVotes(contract){
    let PropID = await contract.methods.retrieveNextPropId().call();
    let votes = "-"
    if(PropID > 0){
        votes = await contract.methods.retrieveVotesForVoter(PropID - 1, Aux.account).call();
        return certFunc.TokensBalance - votes;
    }
    return 0;
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