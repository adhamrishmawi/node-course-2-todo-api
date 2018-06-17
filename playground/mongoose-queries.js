const {ObjectID} = require ('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b266e8998e8c55ca3938bc3';

if(!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id //mongoose will take the string and convert it to an object ID then run the query 
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id 
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e)=> console.log(e));

User.findById('5b253dc3b089f43bf92fa18c').then((user)=>{
  if(!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2))
}, (e) => {
  console.log(e);
});