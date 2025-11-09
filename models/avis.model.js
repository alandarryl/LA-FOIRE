
const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema(
    {
        rating : {
            type : Number,
            required : true,
            min : 1,
            max : 5
        }, 
        comment : {
            type : String,
            default : ""
        },
        // celui qui a ecrit l'avis
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        // article concerné par l'avis
        article : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Article',
            required : true
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('Avis', avisSchema);

