  // Treasury
import { USDDecimals } from '../config';

const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const PriceConverter = require("./PriceConverterFunctions.js");
const Contracts = require("./Contracts.js");
const BigNumber = require('bignumber.js');
const ENSFunc = require("./ENSFunctions.js");


export var AccountBalance = new BigNumber(0);
export var TreasuryBalance = new BigNumber(0);
export var TreasuryAggregatedBalance = new BigNumber(0);

export var PublicPriceUSD = "";
export var PrivatePriceUSD = "";
export var CertificatePriceUSD = "";
export var ProviderPriceUSD = "";
export var OwnerRefundFeeUSD = "";

export var PublicPriceWei = "";
export var PrivatePriceWei = "";
export var CertificatePriceWei = "";
export var ProviderPriceWei = "";
export var OwnerRefundFeeWei = "";

export var PendingPublicPriceUSD = "";
export var PendingPrivatePriceUSD = "";
export var PendingCertificatePriceUSD = "";
export var PendingProviderPriceUSD = "";
export var PendingOwnerRefundFeeUSD = "";

  export async function RetrievePricesTreasury(contract){
    try{
      let response = await contract.methods.retrieveSettings().call();
      PublicPriceUSD = response[0];
      PrivatePriceUSD = response[1];
      ProviderPriceUSD = response[2];
      CertificatePriceUSD = response[3];
      OwnerRefundFeeUSD = response[4];

      let exchangeRate = await PriceConverter.USDToEther(1, Contracts.PriceConverter);
      PublicPriceWei = PublicPriceUSD * exchangeRate;
      PrivatePriceWei = PrivatePriceUSD * exchangeRate;
      ProviderPriceWei = ProviderPriceUSD * exchangeRate;
      CertificatePriceWei = CertificatePriceUSD * exchangeRate;
      OwnerRefundFeeWei = OwnerRefundFeeUSD * exchangeRate;

      PublicPriceUSD = PublicPriceUSD / USDDecimals;
      PrivatePriceUSD = PrivatePriceUSD / USDDecimals;
      ProviderPriceUSD = ProviderPriceUSD / USDDecimals;
      CertificatePriceUSD = CertificatePriceUSD / USDDecimals;
      OwnerRefundFeeUSD = OwnerRefundFeeUSD / USDDecimals;
    }
    catch(e){
      window.alert("error retrieving the prices : " + JSON.stringify(e))
    }
  }

  export async function RetrievePendingPricesTreasury(contract){
    try{
      let response = await contract.methods.retrieveProposition().call();
      PendingPublicPriceUSD = "-";
      PendingPrivatePriceUSD = "-";
      PendingProviderPriceUSD = "-";
      PendingCertificatePriceUSD = "-";
      PendingOwnerRefundFeeUSD = "-";

      if(response[0] != undefined)PendingPublicPriceUSD = Number(response[0]) / USDDecimals;
      if(response[1] != undefined)PendingPrivatePriceUSD = Number(response[1]) / USDDecimals;
      if(response[2] != undefined)PendingProviderPriceUSD = Number(response[2]) / USDDecimals;
      if(response[3] != undefined)PendingCertificatePriceUSD = Number(response[3]) / USDDecimals;
      if(response[4] != undefined)PendingOwnerRefundFeeUSD = Number(response[4]) / USDDecimals;
    }
    catch(e){
      window.alert("error retrieving the pending prices : " + JSON.stringify(e))
    }
    
  }

  export async function RetrieveBalance(address, contract){
    try{
      AccountBalance = new BigNumber(await contract.methods.retrieveFullBalance(address).call());
    }
    catch(e){
      window.alert("error retrieving the account's balance : " + JSON.stringify(e))
    }
  }

  export async function RetrieveTreasuryBalance(contract){
    try{
      TreasuryBalance = new BigNumber(await Aux.web3.eth.getBalance(Manager.TreasuryAddressProxy));
      TreasuryAggregatedBalance = new BigNumber(await contract.methods.retrieveAggregatedAmount().call());
    }
    catch(e){
      window.alert("error retrieving the treasury balance : " + JSON.stringify(e))
    }
  }

  export async function AssignDividends(contract){
    await Aux.CallBackFrame(contract.methods.AssignDividends().send({from: Aux.account }));
  }

  export async function WithdrawAmount(amount, contract){
    await Aux.CallBackFrame(contract.methods.withdraw(amount).send({from: Aux.account }));
  }

  export async function WithdrawAll(contract){
    await Aux.CallBackFrame(contract.methods.withdrawAll().send({from: Aux.account }));
  }