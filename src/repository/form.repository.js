import formDAO from "../dao/form.dao.js";

class FormRepository {
    async getForms() {
        return await formDAO.getAllForms();
    }

    async getTotal() {
        return await formDAO.getTotalIngresos();
    }

    async addForm(data) {
        return await formDAO.createForm(data);
    }

    async removeForm(id) {
        return await formDAO.deleteFormById(id);
    }
}

export default new FormRepository();
