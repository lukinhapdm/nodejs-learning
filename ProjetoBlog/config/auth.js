//Carregando Modulos
const localStrategy = require("passport-local").Strategy //Estratégia de login com usuário e senha
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//Model de usuário
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport) {
	
	//Define quais campos do formulário serão usados como usuário e senha
	passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
		Usuario.findOne({email: email}).then((usuario) => {
			if(!usuario){
				return done(null, false, {message: "Essa conta não existe!"})
			}
			
			//Compara a senha digitada com o hash salvo no banco
			bcrypt.compare(senha, usuario.senha, (erro, equivalem) => {
				if(equivalem){
					return done(null, usuario)
				}else{
					return done(null, false, {message: "Senha incorreta!"})
				}
			})
		})
	}))
	
	//Salva o id do usuário na sessão
	passport.serializeUser((usuario, done) => {
		done(null, usuario.id)
	})
	
	//Busca o usuário pelo id salvo na sessão
	passport.deserializeUser((id, done) => {
		Usuario.findById(id, (erro, usuario) => {
			done(erro, usuario)
		})
	})
	
}