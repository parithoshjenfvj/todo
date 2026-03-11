const todoModel=require("../models/todoEveryday.model")

async function createTodo(req,res){
    try{
        const {title}=req.body
        const todo=await todoModel.create({
            userId:req.user.id,
            title,
            status:"pending"
        })
        res.status(201).json({message:"Todo created successfully",todo})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
async function deleteTodo(req,res){
    try{
        const {id}=req.params
        const todo=await todoModel.findByIdAndDelete(id)
        res.status(200).json({message:"Todo deleted successfully",todo})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

async function updateTodo(req,res){
    try{
        const {id}=req.params
        const {title,status}=req.body
        const todo=await todoModel.findByIdAndUpdate(id,{title,status},{new:true})
        res.status(200).json({message:"Todo updated successfully",todo})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
async function getallTodo(req,res){
    try{
        const todo=await todoModel.find({userId:req.user.id})
        res.status(200).json({message:"Todo fetched successfully",todo})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
module.exports={
    createTodo,
    deleteTodo,
    updateTodo,
    getallTodo
}