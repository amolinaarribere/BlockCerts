
const Aux = require("./AuxiliaryFunctions.js");
const Contracts = require("./Contracts.js");

export const ManagerId = 0;
export const NewContractsId = 1;
export const AddedPropositionId = 2;

export const PublicId = 1;
export const NewProposalId = 0;
export const AddCertificateId = 1;



export var eventlogs = [];

export var ManagerNewContractsConnected = false;
export var ManagerAddedPropositionConnected = false;

export var PublicNewProposalConnected = false;
export var PublicAddCertificatesConnected = false;




const NewContractsInputs = [
  {
    "indexed": false,
    "internalType": "address",
    "name": "Public",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "Treasury",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "Certis",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "PrivateFactory",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "Private",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "ProviderFactory",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "Provider",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "PriceConverter",
    "type": "address"
  }
];

const AddedPropositionInputs = [
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "Id",
    "type": "uint256"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "Proposer",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "Deadline",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "Threshold",
    "type": "uint256"
  }
];

const NewProposalInputs = [
  {
    "indexed": true,
    "internalType": "address",
    "name": "Provider",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "Info",
    "type": "string"
  }
];

const AddCertificatesInputs = [
  {
    "indexed": true,
    "internalType": "address",
    "name": "Provider",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "Holder",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "bytes32",
    "name": "Certificate",
    "type": "bytes32"
  }
];


export async function GetManagerEvents(_block){
    eventlogs[ManagerId] = []

    var options = {
        fromBlock: _block
    };
 
    if(Contracts.certificatePoolManager != ""){
        let newContracts = Contracts.certificatePoolManager.events._NewContracts(options);
        eventlogs[ManagerId][NewContractsId] = []
        newContracts.on('data', event => {eventlogs[ManagerId][NewContractsId][eventlogs[ManagerId][NewContractsId].length] = 
          Aux.web3.eth.abi.decodeLog(NewContractsInputs, event.raw.data, event.raw.topics.slice(1))});
        newContracts.on('changed', changed => window.alert("event removed from blockchain : " + changed))
        newContracts.on('error', err => window.alert("event error : " + err))
        newContracts.on('connected', nr => ManagerNewContractsConnected = true)

        let addedProposition = Contracts.certificatePoolManager.events._AddedProposition(options);
        eventlogs[ManagerId][AddedPropositionId] = []
        addedProposition.on('data', event => {eventlogs[ManagerId][AddedPropositionId][eventlogs[ManagerId][AddedPropositionId].length] = 
          Aux.web3.eth.abi.decodeLog(AddedPropositionInputs, event.raw.data, event.raw.topics.slice(1))})
        addedProposition.on('changed', changed => window.alert("event removed from blockchain : " + changed))
        addedProposition.on('error', err => window.alert("event error : " + err))
        addedProposition.on('connected', nr => ManagerAddedPropositionConnected = true)


    }

}

export async function GetPublicEvents(_block){
    eventlogs[PublicId] = []

    var options = {
        fromBlock: _block
    };
 
    if(Contracts.publicPool != ""){
        let newProposals = Contracts.publicPool.events._NewProposal(options);
        eventlogs[PublicId][NewProposalId] = []
        newProposals.on('data', event => {eventlogs[PublicId][NewProposalId][eventlogs[PublicId][NewProposalId].length] = 
          Aux.web3.eth.abi.decodeLog(NewProposalInputs, event.raw.data, event.raw.topics.slice(1))});
        newProposals.on('changed', changed => window.alert("event removed from blockchain : " + changed))
        newProposals.on('error', err => window.alert("event error : " + err))
        newProposals.on('connected', nr => PublicNewProposalConnected = true)

        let addCertificates = Contracts.publicPool.events._AddCertificate(options);
        eventlogs[PublicId][AddCertificateId] = []
        addCertificates.on('data', event => {eventlogs[PublicId][AddCertificateId][eventlogs[PublicId][AddCertificateId].length] = 
          Aux.web3.eth.abi.decodeLog(AddCertificatesInputs, event.raw.data, event.raw.topics.slice(1))})
        addCertificates.on('changed', changed => window.alert("event removed from blockchain : " + changed))
        addCertificates.on('error', err => window.alert("event error : " + err))
        addCertificates.on('connected', nr => PublicAddCertificatesConnected = true)

    }

}

export async function StartEvents(){
  await GetManagerEvents(0);
  await GetPublicEvents(0)
}

export async function StopEvents(){
    await Aux.web3.eth.clearSubscriptions()
    PublicNewProposalConnected = false;
    PublicAddCertificatesConnected = false;
    ManagerNewContractsConnected = false;
    ManagerAddedPropositionConnected = false;
}

/*
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
}*/

