const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
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
            required: true },  
        token: {
            type: String,
            required: true }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject(); 

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function (params) {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    console.log(token);
    
    user.tokens.push({access, token});
    console.log(user);
    return user.save().then(() => {
        return token;
    });
}; 

var User = mongoose.model('Users', UserSchema);

module.exports = {User};