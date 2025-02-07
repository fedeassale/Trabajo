import express from "express";
import "./database.js";
import viewsRouter from "./route/views.route.js";
import formRouter from "./route/formulario.route.js";
import exphbs from "express-handlebars";
import {Server} from "socket.io";
import Form from "./models/formulario.models.js";

const app = express();
const PUERTO= 8080;

//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//handlebars
const hbs = exphbs.create({
    helpers: {
        isNegative: function (value) {
            return value < 0;
        }
    }
});
app.engine("handlebars", hbs.engine);
app.set("view engine","handlebars");
app.set("views", "./src/views");


//rutas
app.use("/",viewsRouter);
app.use("/formulario",formRouter);


//puerto
const httpServer = app.listen(PUERTO,()=>{
    console.log(`servidor escuchando en el puerto ${PUERTO}`);
    });

    //socket
    const io= new Server(httpServer);
    app.set('io', io);

    io.on("connection",async (socket)=>{
        console.log("Cliente conectado");
    
        const formularios = await Form.find().lean();
        const totalIngresos = await Form.aggregate([{ $group: { _id: null, total: { $sum: "$ingreso" } } }]);
        const total = totalIngresos.length > 0 ? totalIngresos[0].total : 0;
    
        socket.emit("actualizarDatos", { formularios, total });
    
        
        socket.on("mensaje", (data) => {
            console.log(data);
        });
    
        socket.on("disconnect", () => {
            console.log("Cliente desconectado");
        });
    })