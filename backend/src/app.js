const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const userRoutes=require("./routes/user.auth.route")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user/auth",userRoutes);
module.exports=app;