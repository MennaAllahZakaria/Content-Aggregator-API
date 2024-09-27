const mongoose=require("mongoose");


const bookMarkSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    contentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Content",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

},
{timestamps:true});



module.exports = new mongoose.model("BookMark",bookMarkSchema);
