import Form from "../models/formulario.models.js";

class FormDAO {
    async getAllForms() {
        return await Form.find().lean();
    }

    async getTotalIngresos() {
        const result = await Form.aggregate([{ $group: { _id: null, total: { $sum: "$ingreso" } } }]);
        return result.length > 0 ? result[0].total : 0;
    }

    async createForm(data) {
        const newForm = new Form(data);
        return await newForm.save();
    }

    async deleteFormById(id) {
        return await Form.findByIdAndDelete(id);
    }
}

export default new FormDAO();