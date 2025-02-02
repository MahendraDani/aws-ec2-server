import express, {Express,Request,Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{
  res.json({message : "Hello World"});
})

app.get("/hello",(req,res)=>{
  res.json({message : "My Message"})
})

app.listen(PORT,()=>{
  console.log(`Server running at PORT: ${PORT}`);
})