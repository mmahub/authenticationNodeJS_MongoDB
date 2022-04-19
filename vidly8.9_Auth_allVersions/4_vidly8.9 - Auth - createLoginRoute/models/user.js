const mongoose = require('mongoose');
const Joi = require('joi');
//const jwt = require('jsonwebtoken');
//const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength:2,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 900
    },
    //isAdmin: Boolean
});

// creating an method from models schema

const User = mongoose.model('User', userSchema); 

function validateUser(user){
    const schema = {
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().min(2).max(255).email(),
        password: Joi.string().required().min(2).max(255),
       // isAdmin: Joi.boolean()
    }

    return Joi.validate(user, schema);
}

module.exports.User = User ;
module.exports.validateUser = validateUser ;
