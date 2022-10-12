const mongoose = require("mongoose");


const CommentsSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        comment_text: {
            type: String,
            max: 250,
        },
        
    },
    { timestamps: true }
);
module.exports = mongoose.model("Comments", CommentsSchema);