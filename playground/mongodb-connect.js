//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // equivalent to above using object destructuring. Now in addition to also destructuring the ObjectID property

// var obj = new ObjectID();
// console.log(obj);
// We won't be using the two lines above


// Object destructuring lets you pull out properties from an object creating a variable
// var user = {name: 'andrew', age: 25};
// var {name} = user; //we have successfuly desctructured the name property from user
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } // the return statement prevents the rest of the function from running
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //collection takes one argument which is the name of the collection you want to add data into
  //insertOne takes two arguments

  // db.collection('Users').insertOne({
  //   name: 'Adham',
  //   age: 36,
  //   location: 'Palestine'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close(); //This closes the connection with MongoDB server
});