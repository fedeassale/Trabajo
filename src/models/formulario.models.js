import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    asunto: { type: String, required: true },
    ingreso: { type: Number, required: true },
    categoria: { type: String, required: true }
});
const Form = mongoose.model('Form', formSchema);

export default Form;