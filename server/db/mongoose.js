var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //there is a preference here to use promises as opposed to callbacks

//let db = {
 // localhost: 'mongodb://localhost:27017/TodoApp',
 // mlab: 'mongodb://adham:s3ld0m@ds161620.mlab.com:61620/db-for-nodejs-course'
//};

//mongoose.connect(db.localhost || db.mlab);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
// does not require a callback because mongoose is more sophisticated and will wait to connec to the database before attempting to do anything else

module.exports = {mongoose};