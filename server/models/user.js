const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      reqeuired: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}); //let's define a new schema. We do this so that we can generate a model on which we can use methods

//Overriding a JSON method in order not to send back the token and the password. These should never be sent back
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
   //user.toObject takes the user mongoose variable and converting to a regular object where only the properties available on the document exist

  return _.pick(userObject, ['_id', 'email']);
 
};


//our instance methods
UserSchema.methods.generateAuthToken = function () {
  var user = this; // cannot use this with arrow functions
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

// when you do .statics anything you add turns into a model's method as opposed to an instance method
UserSchema.statics.findByToken = function (token) {
  var User = this; //because it is a model method, we use the User (not user)
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id, //quotes are not needed here. they are needed when using . as below but might as well
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

// adding a middleware to UserSchema
// we use pre... 'save', it means before we save to the database
UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }
  
});


var User = mongoose.model('User', UserSchema);

module.exports = {User};