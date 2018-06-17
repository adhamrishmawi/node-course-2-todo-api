var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e) =>{
    res.status(400).send(e);
  });
});



app.listen(3001, ()=>{
  console.log('Started on port 3001');
});



// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc)=> {
//   console.log('Saved todo', doc);
// }, (e)=> {
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   text: 'Edit video',
// });

// otherTodo.save().then((doc)=> {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e)=> {
//   console.log('Unable to save todo');
// });

// User
// email - require it - trim it - set type - set min length of 1
