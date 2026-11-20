const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Model - Postagem

const Postagem = new Schema({
	titulo: {
		type: String,
		require: true
	},
	slug: {
		type: String,
		require: true
	},
	descricao: {
		type: String,
		require: true
	},
	conteudo: {
		type: String,
		require: true
	},
	categoria: {
		type: Schema.Types.ObjectId,
		ref: "categorias", //Referência ao model de categorias (relacionamento)
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
})

//Registra a collection "postagens" no banco
mongoose.model("postagens", Postagem)