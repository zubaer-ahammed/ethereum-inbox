const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
//add provider - (for newer version of web3)
const provider = ganache.provider();

//console.log(ganache.provider());

const web3 = new Web3(provider);


const {interface, bytecode} =  require('../compile');

//console.log(interface);
//console.log(bytecode);

// class Car {
//
//     park() {
//
//         return 'stopped';
//
//     }
//
//     drive() {
//
//         return 'vroom';
//
//     }
//
// }
//
// let car;
//
// beforeEach(() => {
//     car = new Car();
// });
//
// describe('Car', () => {
//
//     it('can park', () => {
//
//         assert.equal(car.park(), 'stopped');
//     });
//
//     it('can drive', () => {
//
//         assert.equal(car.drive(), 'vroom');
//     });
//
// });

let accounts;
let inbox;

beforeEach(async () => {
    //Get list of all accounts

    accounts = await web3.eth.getAccounts();

    //console.log('Deploying from: ', accounts[0]);

    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: 1000000 });

    //setProvider (for newer version of web3)
    inbox.setProvider(provider);

});

describe('Inbox', () => {

    it('deploys a contract', () => {
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {

        //console.log('All accounts: ',accounts);

        const message = await inbox.methods.message().call();
        console.log(message);
        assert.equal(message, 'Hi there!');

    });

    it('can change the message', async () => {

        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        console.log(message);
        assert.equal(message, 'bye');

    });


});
