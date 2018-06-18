var env = process.env.NODE_ENV || 'development'; //for now this is set on heroku. Not set locally
//in this case with || we are setting the default to development

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} 

// heroku config:set MONGODB_URI=yourUrlHere
// when connecting mLab to heroku, I had to use the syntax above in terminal. Discussion is in Q&A of lecture
// 80 (deploy API to Heroku)
