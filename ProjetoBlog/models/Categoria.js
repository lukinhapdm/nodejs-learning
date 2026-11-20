const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Model - Categoria

const Categoria = new Schema({
	nome: {
		type: String,
		require: true
	},
	slug: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
})

//Registra a collection "categorias" no banco
mongoose.model("categorias", Categoria)