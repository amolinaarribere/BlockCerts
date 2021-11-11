
const Aux = require("./AuxiliaryFunctions.js");

export async function UpgradeProposition(NewPropositionBytesArray, contract){
    await Aux.CallBackFrame(contract.methods.sendProposition(NewPropositionBytesArray).send({from: Aux.account }));
}

export async function VoteProposition(Vote, contract){
    await Aux.CallBackFrame(contract.methods.voteProposition(Vote).send({from: Aux.account }));
  }