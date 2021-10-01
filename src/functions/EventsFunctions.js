
const Aux = require("./AuxiliaryFunctions.js");
const Contracts = require("./Contracts.js");



export var eventlogs = [];

// Generic
export const AddCertificateId = 1;
export const AddItemRejectionId = 2;
export const AddItemValidationId = 3;
export const RemoveItemRejectionId = 4;
export const RemoveItemValidationId = 5;
export const AddedPropositionId = 2;

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

const AddItemRejectionInputs = [
  {
    "indexed": false,
    "internalType": "string",
    "name": "ItemType",
    "type": "string"
  },
  {
    "indexed": true,
    "internalType": "bytes32",
    "name": "Item",
    "type": "bytes32"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "Info",
    "type": "string"
  }
]

const AddItemValidationInputs = [
  {
    "indexed": false,
    "internalType": "string",
    "name": "ItemType",
    "type": "string"
  },
  {
    "indexed": true,
    "internalType": "bytes32",
    "name": "Item",
    "type": "bytes32"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "Info",
    "type": "string"
  }
]

const RemoveItemRejectionInputs = [
  {
    "indexed": false,
    "internalType": "string",
    "name": "ItemType",
    "type": "string"
  },
  {
    "indexed": true,
    "internalType": "bytes32",
    "name": "Item",
    "type": "bytes32"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "Info",
    "type": "string"
  }
]

const RemoveItemValidationInputs = [
  {
    "indexed": false,
    "internalType": "string",
    "name": "ItemType",
    "type": "string"
  },
  {
    "indexed": true,
    "internalType": "bytes32",
    "name": "Item",
    "type": "bytes32"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "Info",
    "type": "string"
  }
]

// Manager
export const ManagerId = 0;
export const NewContractsId = 0;


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


// Public
export const PublicId = 1;
export const NewProposalId = 0;

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




export async function GetManagerEvents(_block){
    eventlogs[ManagerId] = []

    var options = {
        fromBlock: _block
    };
 
    if(Contracts.certificatePoolManager != ""){
      ConnectEvent(Contracts.certificatePoolManager.events._NewContracts(options), ManagerId, NewContractsId, NewContractsInputs)
      ConnectEvent(Contracts.certificatePoolManager.events._AddedProposition(options), ManagerId, AddedPropositionId, AddedPropositionInputs)
    }

}

export async function GetPublicEvents(_block){
    eventlogs[PublicId] = []

    var options = {
        fromBlock: _block
    };
 
    if(Contracts.publicPool != ""){
      ConnectEvent(Contracts.publicPool.events._NewProposal(options), PublicId, NewProposalId, NewProposalInputs)
      ConnectEvent(Contracts.publicPool.events._AddCertificate(options), PublicId, AddCertificateId, AddCertificatesInputs)
      ConnectEvent(Contracts.publicPool.events._AddItemRejection(options), PublicId, AddItemRejectionId, AddItemRejectionInputs)
      ConnectEvent(Contracts.publicPool.events._AddItemValidation(options), PublicId, AddItemValidationId, AddItemValidationInputs)
      ConnectEvent(Contracts.publicPool.events._RemoveItemRejection(options), PublicId, RemoveItemRejectionId, RemoveItemRejectionInputs)
      ConnectEvent(Contracts.publicPool.events._RemoveItemValidation(options), PublicId, RemoveItemValidationId, RemoveItemValidationInputs)
    }

}

function ConnectEvent(eventFunction, Id1, Id2, Abi){
  eventlogs[Id1][Id2] = []
  eventFunction.on('data', event => {eventlogs[Id1][Id2][eventlogs[Id1][Id2].length] = 
     Aux.web3.eth.abi.decodeLog(Abi, event.raw.data, event.raw.topics.slice(1))})
  eventFunction.on('changed', changed => window.alert("event removed from blockchain : " + changed))
  eventFunction.on('error', err => window.alert("event error : " + err))
}

export async function StartEvents(){
  await GetManagerEvents(0);
  await GetPublicEvents(0)
}

export async function StopEvents(){
  try{
    if(Aux.web3){
      await Aux.web3.eth.clearSubscriptions()
    }
  }
  catch(e){
    window.alert("error clearing subscription : " + e.message)
  }
    
}


