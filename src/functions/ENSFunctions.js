import ENS, { getEnsAddress } from '@ensdomains/ensjs'

const Aux = require("./AuxiliaryFunctions.js");
const EmptyAddress = "0x0000000000000000000000000000000000000000"
var ens = ""


export async function Resolution(name){
    try{
        initENS();
        var address = await ens.name(name).getAddress();
        if(EmptyAddress == address)address = name;
        return address;
    }
    catch(e){
        window.alert("error reversing the address : " + e)
        return name;
    }
    
}

export async function ReverseResolution(address){
    try{
        initENS();
        var name = await ens.getName(address)

        if(name.name == null ||
            Aux.web3.utils.toChecksumAddress(address) != await ens.name(name.name).getAddress()) return [address, false];
        
        return [name.name, true];
    }
    catch(e){
        window.alert("error reversing the address : " + e)
        return [address, false];
    }
   
}

function initENS(){
    var provider = Aux.web3.currentProvider
    ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
}

