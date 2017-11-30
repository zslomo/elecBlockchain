/**
 * Created by lomo on 2017/11/15.
 */

var Web3 = require('web3');
var Personal = require('web3-eth-personal');
personal = new Personal(new Personal.providers.HttpProvider("http://localhost:8545"));
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://101.132.144.50:8545"));
}
var contractAddr = "0x2c578199ea42a36235a6d4659ac8e0e57141a238";
var contractAbi = [{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"getProductsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"electNumSeller","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"electRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electGoal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electType","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deleteProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_electAccount","type":"uint256"},{"name":"_elecTpye","type":"bytes"},{"name":"_detail","type":"bytes"},{"name":"_uintPrice","type":"uint256"}],"name":"electPublish","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_electGoal","type":"uint256"},{"name":"_electPrice","type":"uint256"},{"name":"_type","type":"bytes"}],"name":"ReleaseElectransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_seller","type":"address"},{"name":"_buyElectAccount","type":"uint256"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sellers","outputs":[{"name":"addr","type":"address"},{"name":"elecAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getProducts","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bytes"},{"name":"","type":"bytes"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_elects","type":"uint256"}],"name":"sell","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"clean","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenTransfer","type":"event"}];

var MyContract = new web3.eth.Contract(contractAbi,contractAddr);
//var contractInstance = MyContract.at(contractAddr);
//accounts = ["0xcd2aaa1c5d16fdf3ab5880ef4c2455351bf76c9b", "0xed801c488a9b9bfe37fd7cca096bd03f99d58e69", "0xdc6ce6196fa39e2beaefe5986400704b987ea589"];
var account_one = "0x4b8e93154821e8fdf76fdca9ce77efd1109dcc60" ;

//unlock account
//personal.unlockAccount(account_one,"1234",300).then(console.log);
publish(100,"g","good",6);
var l = getProductsLenght();
console.log(l);
function publish(electAmount,type,detail,unitPrice) {
    //publish product
    var publish = MyContract.methods.electPublish(electAmount,web3.utils.asciiToHex(type),web3.utils.asciiToHex(detail),unitPrice).send({from: account_one}, function(error, transactionHash){
        console.log("electPublish error:" + error);
        console.log("electPublish transactionHash:" + transactionHash);
    });
}

function getProductsLenght(){
    //get the size of products
    var productsLenght = MyContract.methods.getProductsLength().call().then(console.log);
    console.log(publish);
}


function buy(sellerTraditon,amount) {
    //buy product
    var buy = MyContract.methods.buy(sellerTraditon,amount).send({from: account_one}, function(error, transactionHash){
        console.log("buy error:" + error);
        console.log("buy transactionHash:" + transactionHash);
    });
}

function release(electGoal,electPrice,type) {
    //release elect request
    var release = MyContract.methods.ReleaseElectransaction(electGoal,electPrice,type).send({from: account_one}, function(error, transactionHash){
        console.log("buy error:" + error);
        console.log("buy transactionHash:" + transactionHash);
    });
}
function sell(elects) {
    //sell elect to the one who release elect request
    var sell = MyContract.methods.sell(elects).send({from: account_one}, function(error, transactionHash){
        console.log("buy error:" + error);
        console.log("buy transactionHash:" + transactionHash);
    });
}
