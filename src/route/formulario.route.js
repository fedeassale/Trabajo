import { Router } from "express";
const router = Router(); 
import Form from "../models/formulario.models.js";

router.post('/', async (req, res) => {
    const { asunto, ingreso, categoria } = req.body;

    if (!asunto || !ingreso || !categoria) {
        return res.status(400).render('datos', { error: "Todos los campos son obligatorios" });
    }

    try {
        const nuevoFormulario = new Form({ asunto, ingreso, categoria });
        await nuevoFormulario.save();

        const formularios = await Form.find().lean();

        const totalIngresos = await Form.aggregate([
            { $group: { _id: null, total: { $sum: "$ingreso" } } }
        ]);

        const total = totalIngresos.length > 0 ? totalIngresos[0].total : 0;

        res.render("datos", { formularios ,total });
    } catch (err) {
        res.status(500).render('datos', { error: "Error al guardar los datos" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Form.findByIdAndDelete(id);

        const io = req.app.get('io');
        // const formularios = await Form.find().lean();

        const formulariosActualizados = await Form.find().lean();
        const totalActualizado = await Form.aggregate([
            { $group: { _id: null, total: { $sum: "$ingreso" } } }
        ]);
        const total = totalActualizado.length > 0 ? totalActualizado[0].total : 0;

        io.emit('actualizarDatos', { formularios: formulariosActualizados, total });

        res.json({ success: true });
        // const totalIngresos = await Form.aggregate([
        //     { $group: { _id: null, total: { $sum: "$ingreso" } } }
        // ]);
        // const total = totalIngresos.length > 0 ? totalIngresos[0].total : 0;

        // res.json({ success: true, formularios, total });
    } catch (err) {
        res.status(500).json({ success: false, error: "Error al eliminar el gasto" });
    }
});



export default router;

