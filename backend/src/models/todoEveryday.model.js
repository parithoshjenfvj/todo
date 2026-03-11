const mongoose=require("mongoose");

const todoEverydaySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    }
})
const todoEverydayModel=mongoose.model("todoEveryday",todoEverydaySchema);
module.exports=todoEverydayModel;