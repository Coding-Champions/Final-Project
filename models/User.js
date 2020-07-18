const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    showList:{
        type:Array,
        default:[],
    }, 
    favList: {  //so push an array of objects in here.
        type:Array,
        default:[],
    }
})

module.exports = mongoose.model('user', userSchema);