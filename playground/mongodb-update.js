const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b252df7b3bf48849cd7791c')
  //  },{
  //    $set: {
  //      completed: true
  //    }
  //  },{
  //    returnOriginal: false
  //  }).then((result)=>{
  //    console.log(result);
  //  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b23f71c32a926207a4c1b14')
   },{
     $set: {
       name: 'Jen'
     },
     $inc: {
       age: 1
     }
   },{
     returnOriginal: false
   }).then((result)=>{
     console.log(result);
   });


  // client.close(); 
});