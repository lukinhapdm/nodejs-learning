const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Model - Usuario

const Usuario = new Schema({
	nome: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	eAdmin: { //1 = admin, 0 = usuário comum
		type: Number,
		default: 0
	},
	senha: {
		type: String,
		require: true
	}
})

//Registra a collection "usuarios" no banco
mongoose.model("usuarios", Usuario)