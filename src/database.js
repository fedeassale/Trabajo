import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/TrabajoPractico")
    .then(()=>console.log("Conexion exitosa"))
    .catch((err)=>console.log(err));