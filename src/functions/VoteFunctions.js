
const Aux = require("./AuxiliaryFunctions.js");
const certFunc = require("./CertisFunctions.js");


export async function UpgradeProposition(NewPropositionBytesArray, contract){
    await Aux.CallBackFrame(contract.methods.sendProposition(NewPropositionBytesArray).send({from: Aux.account }));
}

export async function VoteProposition(Vote, contract){
    await Aux.CallBackFrame(contract.methods.voteProposition(Vote).send({from: Aux.account }));
  }

export async function PropositionStatus(contract){
    return await contract.methods.retrievePropositionStatus().call({from: Aux.account });
}

export async function PropositionRemainingVotes(contract){
    let PropID = await contract.methods.retrieveNextPropId().call({from: Aux.account });
    let votes = "-"
    if(PropID > 0){
        votes = await contract.methods.retrieveVotesForVoter(PropID - 1, Aux.account).call({from: Aux.account });
        return certFunc.TokensBalance - votes;
    }
    return 0;
}