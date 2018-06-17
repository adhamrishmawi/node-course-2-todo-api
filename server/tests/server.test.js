const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//beforeEach is used to setup the database in a way that's useful. Otherwise, the test case below where we check that the database has one item will fail if the database already has data
beforeEach((done)=>{
  Todo.remove({}).then(()=> done()); //this will remove all items in database
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=> {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) =>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  
  it('should not create todo with invalid body data', (done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res)=>{
        if(err) {
          return done(err);
        }
        Todo.find().then((todos)=> {
          expect(todos.length).toBe(0);
          done();
        }).catch((e)=>done(e));
      });
  });
});