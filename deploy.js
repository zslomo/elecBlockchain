/**
 * Created by lomo on 2017/11/16.
 */
Web3 = require('web3');
fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var accounts;
web3.eth.getAccounts(function (error,accts) {
    //console.log(accts);
    accounts = accts;
    code = fs.readFileSync('electransaction.sol').toString();
    solc = require('solc');
    compiledCode = solc.compile(code);
    abiDefinition = JSON.parse(compiledCode.contracts[':electransaction'].interface);
    //console.log(abiDefinition);
    Contract = new web3.eth.Contract(abiDefinition);
    byteCode = compiledCode.contracts[':electransaction'].bytecode;
    //console.log(byteCode);

    Contract.deploy().send({
        from: accounts[0],
        gas: 1500000,
        gasPrice: '30000000000000'
    }).then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
});

console.log(accounts);
