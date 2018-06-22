const {SHA256} = require('crypto-js');  //this is requiring a certain property (SHA256) of the return result

const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc'); //123abc is the secret
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString(); //toString because the result is an object

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data ={
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash===token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed');
// }

