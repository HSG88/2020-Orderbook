const Node = artifacts.require('Node');
const linkedlist = artifacts.require('linkedlist');
//var Itemaddress;



// contract('ObjectFactory', function(accounts) {
//     it('should create another object', async() => {
//         const ObjectFactoryInstance = await ObjectFactory.deployed(); 
        
//         await ObjectFactoryInstance.
        
//     });



// contract('Node', function(accounts) {
//     it('should create another object', async() => {
//         const ItemtInstance = await Item.deployed(); 
//         //accounts = await web3.eth.getAccounts();
//         Itemaddress = ItemtInstance.address;
//         //const receipt = await FactorytInstance.add("0x0000000000000000000000000000000000000000",{from: accounts[0]});
//         //const tx = await web3.eth.getTransaction(receipt.tx);
//         //console.log(`GasPrice: ${tx}`);
//         //await ItemtInstance.addNew("0x1000000000000000000000000000000000000000");
//     });


// });
contract('linkedlist', function(accounts) {
    it('should create another object', async() => {
        const linkedlisttInstance = await linkedlist.deployed(); 
        //accounts = await web3.eth.getAccounts();
        
        //const receipt = await FactorytInstance.add("0x0000000000000000000000000000000000000000",{from: accounts[0]});
        //const tx = await web3.eth.getTransaction(receipt.tx);
        //console.log(`GasPrice: ${tx}`);
        
        const result = await FactorytInstance.add(Itemaddress);
        //const {0: link, 1: next} = result;
        //console.log('The link is:', link);
        //console.log('The next is:', next);
        console.log(result);

        

    });


});

