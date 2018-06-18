const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//setting up for Hiroku
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos}); //could do res.send(todos) but this would return an array which is limiting. Do it with {todos: todos} or in ES6 {todos} to return it an as object
  }, (e)=> {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res)=> { //will create an id variable that will be on the req object. Accessible using req.params.id
  var id =req.params.id;
 
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=> {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo) { 
      return res.status(404).send();
    } //this has to be done because the findbyidandremove function will return true even if there was nothing to remove
    res.send({todo});
  }).catch((e) =>{
    res.status(400).send();
  });
});


app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); // pick is a lodash method that allows us to pick which properties the user gets to update. For example, we do not want the user to be able to update Completed At. That is something for the server to update

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime(); //returns a javascript timestamp; number of seconds since midnight on january 1 1970.
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
  // new: true in order to get the new item returned not the old one
});

module.exports = {app};



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

