const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var msg = "My name is Alok";
// var hash = SHA256(msg);

// console.log(`Msg: ${msg}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resutlHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resutlHash === token.hash) {
//     console.log("No change in data");  
// }

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123ab');
console.log(decoded);


