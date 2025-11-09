const mongoose = require("mongoose");

const userSchema = new mpngoose.Schema(
    {
        prenom : {
            type: String,
            required: true
        },
        avatar : {
            type: String,
            default : ""
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        isActive : {
            type: Boolean,
            default : true
        },
        role : {
            type: String,
            enum : ['user', 'admin'],
            default : 'user'
        },
        
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
