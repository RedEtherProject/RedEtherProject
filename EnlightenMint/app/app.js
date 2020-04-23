//vanilla js

function Coin(Contract) {
  this.web3 = null;
  this.instance = null;
  this.Contract = Contract;
}

Coin.prototype.init = function() {
  this.web3 = new Web3(
    (window.web3 && window.web3.currentProvier) ||
    new Web3.providers.HttpProvider(this.Contract.endpoint));
 
    var contract_interface = this.web3.eth.contract(this.Contract.abi);
    this.instance = contract_interface.at(this.Contract.address);
}


Coin.prototype.showAddressBalance = function() {
  var that = this;

  var address = $("#balance-address").val();

  if(!isValidAddress(address)) {
    console.log("Invalid address");
    return;
  }

  this.getBalance(address, function(err, balance) {
    if(error) {
      console.log(error);
    }
    else {
      console.log(balance.toNumber());
        $("#message").text(balance.toNumber());
    }
  })
}

Coin.prototype.getBalance = function(address, callback) {
  this.instance.balances(address, function(error, result){
    callback(error, result);
  })
}


Coin.prototype.createTokens = function() {
  var that = this;
  var address = $("#create-address").val(); //referencing element by id
  var amount = $("#create-amount").val();
  console.log(amount);

  if(!isValidAddress(addresss)) {
    console.log("invalid address");
    return;
  }

  if(!isValidAmount(amount)) {
    console.log("Invalid amount");
    return;
  }

  this.instance.mint(adderss, amount, { from: window.web3.eth.accounts[0], gas: 100000, gasPrice: 100000, gasLimit: 100000 }, 
    function(error, txHash) {
      if(error){
        console.log(error);
      }
      else {
        that.waitForReceipt(txHash, function(receipt) {
          if(receipt.status) {
            $("#create-address").val("");
            $("#create-amount").val("");
          } else {
            console.log("error");
          }
        });
      }
    })
}


Coin.prototype.waitForReceipt = function(hash, callback) {
  var that = this;

  this.web3.eth.getTransactionReceipt(hash, function(err, receipt) {
    if(err) {
      error(err);
    } 
    if(receipt !== null) {
      if(callback) {
        callback(receipt);
      } 
    } else {
      window.setTimeout(function() {
        that.waitForReceipt(has, callback);
      }, 2000);
    }
  });
}


function isValidAddress(address) {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

function isValidAmount(amount) {
  return amount > 0 && typeof Number(amount) == 'number';
}


//binding
Coin.prototype.bindButtons = function () {
  var that = this;

  $(document).on("click", "#button-create", function() {
    that.createTokens();
  });

  $(document).on("click", "#button-check", function() {
    that.showAddressBalance();
  });
}

Coin.prototype.onRead = function() {
  this.bindButtons();
  this.init();
};

if(typeof(Contracts) === "undefined") var Contracts={ Coin: { abi: [] }};
var coin = new Coin(Contracts['Coin']);

$(document).ready(function() {
  coin.onReady();
});