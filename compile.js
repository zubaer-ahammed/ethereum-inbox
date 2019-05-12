const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//console.log(solc.compile(source, 1));

// console.log(solc.compile(source, 1).contracts.Inbox.bytecode);
// console.log(solc.compile(source, 1).contracts.Inbox.interface);

//console.log(solc.compile(source, 1).contracts[':Inbox']);

//console.log(solc.compile(source, 1).contracts[':Inbox'].bytecode);
//console.log(solc.compile(source, 1).contracts[':Inbox'].interface);

module.exports = solc.compile(source, 1).contracts[':Inbox'];
//module.exports = solc.compile(source, 1).contracts.Inbox;