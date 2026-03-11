const app=require("./src/app");
const dotenv=require("dotenv");
dotenv.config();
const connectToDb=require("./src/db/db");

const PORT=process.env.PORT_NUMBER

connectToDb();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})