const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne deletes first item that matches the critera then it stops
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
  //   console.log(result);
  // }); 

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //db.collection('Users').deleteMany({name: 'Andrew'});

  db.collection('Users').findOneAndDelete({_id: new ObjectID("5b2530d7b3bf48849cd77ac2")}).then((results)=>{
    console.log(JSON.stringify(results, undefined, 2));
  });


  // client.close(); 
});