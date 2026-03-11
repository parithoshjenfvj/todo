const express=require("express");
const router=express.Router();
const todoController=require("../controllers/todo.controller")
const authMiddleware=require("../middleware/auth.middleware")
router.post("/create",authMiddleware,todoController.createTodo)
router.delete("/delete/:id",authMiddleware,todoController.deleteTodo)
router.put("/update/:id",authMiddleware,todoController.updateTodo)
router.get("/getall",authMiddleware,todoController.getallTodo)
module.exports=router;