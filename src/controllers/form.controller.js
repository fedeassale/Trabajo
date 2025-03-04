import formService from "../services/form.service.js";

class FormController {
    async renderFormulario(req, res) {
        res.render("formulario");
    }

    async obtenerDatos(req, res) {
        try {
            const { formularios, total } = await formService.obtenerFormularios();
            res.render("datos", { formularios, total });
        } catch (err) {
            res.status(500).render("datos", { error: "Error al obtener los datos" });
        }
    }

    async crearFormulario(req, res) {
        try {
            const { asunto, ingreso, categoria } = req.body;
            const { formularios, total } = await formService.crearFormulario({ asunto, ingreso, categoria });
            res.render("datos", { formularios, total });
        } catch (err) {
            res.status(400).render("datos", { error: err.message });
        }
    }

    async eliminarFormulario(req, res) {
        try {
            const { id } = req.params;
            const { formularios, total } = await formService.eliminarFormulario(id);

            const io = req.app.get('io');
            io.emit('actualizarDatos', { formularios, total });

            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: "Error al eliminar el gasto" });
        }
    }
}

export default new FormController();