const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        content : {
            type: String,
            required: true
        }, 
        category : {
            type: String,
            required: true
        },
        brand : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required : true
        },
        avis: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Avis'
            }
        ],
        // image princpale obligatoire
        img: {
            type: String,
            required: true
        },
        img1 : {
            type: String
        }, 
        img2 : {
            type: String
        },
        img3 : {
            type: String
        },
        img4 : {
            type: String
        },

        // status
        status : {
            type: Boolean,
            default : true
        },
        stock : {
            type : Number,
            default : 0
        }
    }, { timestamps: true }
);

// validation d'au moins une image principale et 2 images secondaires

articleSchema.pre('save', function(next){
    const coutImages = [
        this.img,
        this.img1,
        this.img2,
        this.img3,
        this.img4
    ].filter(Boolean).length;

    if(coutImages < 3){
        return next(new Error('Au moins une image principale et deux images secondaires sont requises.'));
    }

    next();
});


module.exports = mongoose.model('Article', articleSchema);



