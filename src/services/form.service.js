import formRepository from "../repository/form.repository.js";

class FormService {
    async obtenerFormularios() {
        const formularios = await formRepository.getForms();
        const total = await formRepository.getTotal();
        return { formularios, total };
    }

    async crearFormulario(data) {
        if (!data.asunto || !data.ingreso || !data.categoria) {
            throw new Error("Todos los campos son obligatorios");
        }
        await formRepository.addForm(data);
        return this.obtenerFormularios();
    }

    async eliminarFormulario(id) {
        await formRepository.removeForm(id);
        return this.obtenerFormularios();
    }
}

export default new FormService();