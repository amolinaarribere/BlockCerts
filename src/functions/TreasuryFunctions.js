  // Treasury
const Aux = require("./AuxiliaryFunctions.js");
const Manager = require("./ManagerFunctions.js");
const PriceConverter = require("./PriceConverterFunctions.js");
const BigNumber = require('bignumber.js');

export var LastAssigned = new BigNumber(0);
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
    let response = await contract.methods.retrievePrices().call();
    PublicPriceUSD = response[0];
    PrivatePriceUSD = response[1];
    ProviderPriceUSD = response[2];
    CertificatePriceUSD = response[3];
    OwnerRefundFeeUSD = response[4];
    let exchangeRate = await PriceConverter.USDToEther(1);
    PublicPriceWei = PublicPriceUSD * exchangeRate;
    PrivatePriceWei = PrivatePriceUSD * exchangeRate;
    ProviderPriceWei = ProviderPriceUSD * exchangeRate;
    CertificatePriceWei = CertificatePriceUSD * exchangeRate;
    OwnerRefundFeeWei = OwnerRefundFeeUSD * exchangeRate;
  }

  export async function RetrievePendingPricesTreasury(contract){
    let response = await contract.methods.retrieveProposition().call();
    PendingPublicPriceUSD = Number(response[0]);
    PendingPrivatePriceUSD = Number(response[1]);
    PendingProviderPriceUSD = Number(response[2]);
    PendingCertificatePriceUSD = Number(response[3]);
    PendingOwnerRefundFeeUSD = Number(response[4]);
  }
    

  export async function UpgradePricesTreasury(NewPublicPriceUSD, NewPrivatePriceUSD, NewProviderPriceUSD, NewCertificatePriceUSD, NewOwnerRefundFeeUSD, contract){
    await Aux.CallBackFrame(contract.methods.updatePrices(
      (new BigNumber(100 * NewPublicPriceUSD)).decimalPlaces(0),
      (new BigNumber(100 * NewPrivatePriceUSD)).decimalPlaces(0), 
      (new BigNumber(100 * NewProviderPriceUSD)).decimalPlaces(0),
      (new BigNumber(100 * NewCertificatePriceUSD)).decimalPlaces(0), 
      (new BigNumber(100 * NewOwnerRefundFeeUSD)).decimalPlaces(0)
    ).send({from: Aux.account }));
  }

  export async function RetrieveLastAssigned(address, contract){
    LastAssigned = new BigNumber(await contract.methods.retrieveLastAssigned(address).call());
  }

  export async function RetrieveBalance(address, contract){
    AccountBalance = new BigNumber(await contract.methods.retrieveBalance(address).call());
  }

  export async function RetrieveTreasuryBalance(contract){
    TreasuryBalance = new BigNumber(await Aux.web3.eth.getBalance(Manager.TreasuryAddressProxy));
    TreasuryAggregatedBalance = new BigNumber(await contract.methods.retrieveAggregatedAmount().call());
  }

  export async function AssignDividends(contract){
    await Aux.CallBackFrame(contract.methods.AssignDividends().send({from: Aux.account }));
  }

  export async function WithdrawAmount(amount, contract){
    await Aux.CallBackFrame(contract.methods.withdraw(amount).send({from: Aux.account }));
  }