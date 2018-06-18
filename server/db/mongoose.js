var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //there is a preference here to use promises as opposed to callbacks

mongoose.connect(process.env.MONGODB_URI);
// does not require a callback because mongoose is more sophisticated and will wait to connec to the database before attempting to do anything else

module.exports = {mongoose};
