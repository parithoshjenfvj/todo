const express=require("express");
const app=express();
const userRoutes=require("./routes/user.auth.route")
app.use(express.json());

app.use("/user/auth",userRoutes);
module.exports=app;