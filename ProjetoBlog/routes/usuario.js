//Carregando Modulos
const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") //Biblioteca para gerar o hash das senhas
const passport = require("passport")

const router = express.Router();

//Model
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

//Registro
	//Formulário de registro
router.get('/registro', (req, res) => {
	res.render("usuarios/registro")
})

	//Cadastro do usuário
router.post('/registro', (req, res) => {
	
	//Validação do formulário
	var erros = []
	
	if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
		erros.push({texto: "Nome inválido!"})
	}
	if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
		erros.push({texto: "Email inválido!"})
	}
	if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
		erros.push({texto: "Senha inválido!"})
	}
	if (req.body.senha.length < 4) {
		erros.push({texto: "Senha muito curta!"})
	}
	if (req.body.senha != req.body.senha2) {
		erros.push({texto: "Senhas diferentes, tente novamente!"})
	}
	
	if (erros.length > 0) {
		res.render("usuarios/registro", {erros: erros})
	}
	else {
		Usuario.findOne({email: req.body.email}).then((usuario) => { //Verifica se o e-mail já está cadastrado
			if(usuario) {
				req.flash("error_msg", "Já existe um conta com esse e-mail!")
				res.redirect("/usuarios/registro")
			}
			else {
				
				const novoUsuario = new Usuario ({
					nome: req.body.nome,
					email: req.body.email,
					senha: req.body.senha
				})
				
				//Gera o hash da senha antes de salvar no banco
				bcrypt.genSalt(10, (erro, salt) => {
					bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
						if(erro) {
							req.flash("error_msg", "Houve um erro durante o salvamento do usuário!")
							res.redirect("/")
						}
						
						novoUsuario.senha = hash //Substitui a senha pelo hash
						
						novoUsuario.save().then(() => {
							req.flash("success_msg", "Usuário criado com sucesso!")
							res.redirect("/")
						}).catch((erro) => {
							req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!")
							res.redirect("/usuarios/registro")
						})
					})
				})
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro interno!")
			res.redirect("/")
		})
	}
})

//Login
	//Formulário de login
router.get('/login', (req, res) => {
	res.render("usuarios/login")
})

	//Autenticação com o Passport
router.post('/login', (req, res, next) => {
	
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/usuarios/login",
		failureFlash: true
	})(req, res, next)
	
})

//Logout
router.get('/logout', (req, res, next) => {
	req.logout((erro) => {
		if(erro){
			return next(erro)
		}
		req.flash("success_msg", "Deslogado com sucesso!")
		res.redirect("/")
	})
})

module.exports = router //Exporta as rotas para o app.js