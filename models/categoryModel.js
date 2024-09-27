const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,"Too short category name"],
        maxlength:[32,"Too long category name"]
    },
    description:{
        type:String,
        trim:true,
        required:true,
        minlength:[3,"Too short category description"],
        maxlength:[255,"Too long category description"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

},
{timestamps:true});




module.exports= new mongoose.model("Category",categorySchema);
