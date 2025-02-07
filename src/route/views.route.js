import { Router } from "express";
import Form from "../models/formulario.models.js";

const router = Router(); 


router.get("/", (req, res) => {
    res.render("formulario"); 
});

router.get("/formulario", async (req, res) => {
    try {
        const formularios = await Form.find().lean();
        const totalIngresos = await Form.aggregate([{ $group: { _id: null, total: { $sum: "$ingreso" } } }]);
        const total = totalIngresos.length > 0 ? totalIngresos[0].total : 0;

        res.render("datos", { formularios, total });
    } catch (err) {
        res.status(500).render("datos", { error: "Error al obtener los datos" });
    }
});

 export default router;