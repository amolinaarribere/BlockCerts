
const Aux = require("./AuxiliaryFunctions.js");
const Contracts = require("./Contracts.js");

export const PublicId = 0;
export const NewProposalId = 0;

export var eventlogs = [];
export var PublicNewProposalConnected = false;
export var text = "";

export async function GetPublicEvents(_block){
    eventlogs[PublicId] = []

    var options = {
        fromBlock: _block
    };

    var NewProposalInputs = [
        {
          "indexed": true,
          "name": "",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "",
          "type": "string"
        }
      ];

    
    if(Contracts.publicPool != ""){
        let newProposals = Contracts.publicPool.events._NewProposal(options);
        eventlogs[PublicId][NewProposalId] = []
        newProposals.on('data', event => {eventlogs[PublicId][NewProposalId][eventlogs[PublicId][NewProposalId].length] = Aux.web3.eth.abi.decodeLog(NewProposalInputs, event.raw.data, event.raw.topics.slice(1))})
        newProposals.on('changed', changed => window.alert("event removed from blockchain : " + changed))
        newProposals.on('error', err => window.alert("event error : " + err))
        newProposals.on('connected', nr => PublicNewProposalConnected = true)
    }

}

export async function StopEvents(){
    Aux.web3.eth.clearSubscriptions()
    PublicNewProposalConnected = false;
}


export async function GetEvents(_block, _contractAddresses, _id){
    let options = {
        fromBlock: _block,
        address: _contractAddresses,    //Only get events from specific addresses
        topics: []                              //What topics to subscribe to
    };

    eventlogs[_id] = []

    let subscription = Aux.web3.eth.subscribe('logs', options)

    subscription.on('data', event => {eventlogs[_id][eventlogs[_id].length] = event})
    subscription.on('changed', changed => window.alert("event removed from blockchain : " + changed))
    subscription.on('error', err => window.alert("event error : " + err))
    subscription.on('connected', nr => window.alert("event connected : " + nr))
}

