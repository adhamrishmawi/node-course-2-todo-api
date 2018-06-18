const {ObjectID} = require ('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// }); // removes everything.

//Todo.findOneAndRemove() //with this method we get the item we are removing back so we can print it to the screen or do something with it... unlike above. 

//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5b27d9eab3bf48849cd798f9'}).then((todo)=>{

});


Todo.findByIdAndRemove('5b27d9eab3bf48849cd798f9').then((todo)=>{
  console.log(todo);
});