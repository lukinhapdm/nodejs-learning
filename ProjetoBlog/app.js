//Carregando Modulos
	const express = require("express");
	const handlebars = require('express-handlebars')
	const bodyParser = require('body-parser')
	const mongoose = require("mongoose")
	const path = require("path") //Módulo padrão do Node.Js
	const session = require("express-session")
	const flash = require("connect-flash") //É umtipo de sessão que só aparece uma vez
	const passport = require("passport")
	
	const app = express();
	//Arquivos de rotas
	const admin = require("./routes/admin");
	const usuarios = require("./routes/usuario");
	
	//Models
	require("./models/Postagem")
	const Postagem = mongoose.model("postagens")
	require("./models/Categoria")
	const Categoria = mongoose.model("categorias")
	require("./config/auth")(passport) //Configuração da estratégia de login do Passport

//Configurações
	//Sessão
		app.use(session({
			secret: "2w17mljsedgf", //Chave usada para assinar o cookie da sessão
			resave: true,
			saveUninitialized: true
		}))
		
		//Passport (deve ficar abaixo da sessão)
		app.use(passport.initialize())
		app.use(passport.session())
		app.use(flash()) // Deve ficar abaixo da sessão
	//Middleware
		app.use((req, res, next) => {
			res.locals.success_msg = req.flash("success_msg") //O res.local é a forma de declarar uma variavel global
			res.locals.error_msg = req.flash("error_msg")
			res.locals.error = req.flash("error")
			res.locals.user = req.user || null; //Usuário logado (fica null quando não há login)
			res.locals.eAdmin = req.user && req.user.eAdmin == 1 //Usado na navbar para exibir o link do painel admin
			res.locals.nomeUsuario = req.user ? req.user.nome : null //Nome exibido no menu do usuário
			res.locals.pathAtual = req.path //Rota atual, usada para destacar o link ativo na navbar
			res.locals.ano = new Date().getFullYear() //Ano atual exibido no footer
			next() //Libera a requisição para seguir adiante
		})
	//Body Parser
		app.use(bodyParser.urlencoded({extended: true}))
		app.use(bodyParser.json())
	//Handlebars
		app.engine('handlebars', handlebars.engine({
			defaultLayout: 'main', // O main é o tamplate padrão do projeto
			helpers: require("./helpers/handlebars") //Funções que podem ser usadas dentro das views
		}))
		app.set('view engine', 'handlebars')
	//Mongoose
		mongoose.Promise = global.Promise;
		mongoose.connect("mongodb://127.0.0.1:27017/blogapp", {
			useNewUrlParser:true,
			useUnifiedTopology: true
		})
		.then(() => console.log('Conectado!'))
		.catch((erro) => console.log('Erro ao se conectar: '+erro));
	//Public
		app.use(express.static(path.join(__dirname, "public"))) //Pasta de arquivos estáticos (CSS, JS, imagens)		
		
//Rotas
	//Home: lista as postagens da mais nova para a mais antiga e as categorias na lateral
	app.get('/', (req, res) => {
		Postagem.find().populate("categoria").sort({date:"desc"}).lean().then((postagens) => { //O .populate() traz os dados da categoria junto da postagem
			Categoria.find().sort({nome: "asc"}).lean().then((categorias) => {
				res.render("index", {postagens: postagens, categorias: categorias})
			}).catch((erro) => {
				req.flash("error_msg", "Houve um erro ao listar as categorias!")
				res.redirect("/404")
			})
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro interno!")
			res.redirect("/404")
		})
	})
	
	//Página de erro
	app.get("/404", (req, res) => {
		res.status(404).render("404")
	})
	
	//Busca de postagens pelo título ou descrição
	app.get("/busca", (req, res) => {
		const termo = (req.query.q || "").trim()
		if (!termo) {
			return res.redirect("/")
		}
		const regex = new RegExp(termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") //Escapa caracteres especiais e ignora maiúsculas/minúsculas
		Postagem.find({$or: [{titulo: regex}, {descricao: regex}]}).populate("categoria").sort({date: "desc"}).lean().then((postagens) => {
			res.render("busca", {postagens: postagens, termo: termo})
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao realizar a busca!")
			res.redirect("/")
		})
	})
	
	//Página de uma postagem, buscada pelo slug
	app.get("/postagem/:slug", (req, res) => {
		Postagem.findOne({slug: req.params.slug}).populate("categoria").lean().then((postagem) => {
			if(postagem) {
				//Busca até 3 postagens da mesma categoria (sem repetir a atual)
				Postagem.find({categoria: postagem.categoria, _id: {$ne: postagem._id}}).sort({date: "desc"}).limit(3).lean().then((relacionadas) => {
					res.render("postagem/index", {postagem: postagem, relacionadas: relacionadas})
				}).catch((erro) => {
					res.render("postagem/index", {postagem: postagem}) //Se falhar, mostra a postagem sem as relacionadas
				})
			}else {
				req.flash("error_msg", "Esta postagem não existe!")
				res.redirect("/")
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro interno!")
			res.redirect("/")
		})
	})
	
	//Listagem de categorias com a quantidade de postagens de cada uma
	app.get("/categorias", (req, res) => {
		Categoria.find().sort({nome: "asc"}).lean().then((categorias) => {
			//O aggregate agrupa as postagens por categoria e conta quantas existem em cada uma
			Postagem.aggregate([{$group: {_id: "$categoria", total: {$sum: 1}}}]).then((contagem) => {
				categorias.forEach((categoria) => {
					const item = contagem.find((c) => String(c._id) == String(categoria._id))
					categoria.total = item ? item.total : 0
				})
				res.render("categorias/index", {categorias: categorias})
			}).catch((erro) => {
				res.render("categorias/index", {categorias: categorias}) //Se falhar, mostra as categorias sem a contagem
			})
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao listar as categorias!")
			res.redirect("/")
		})
	})
	
	//Postagens de uma categoria
	app.get("/categorias/:slug", (req, res) => {
		Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
			if(categoria) {
				Postagem.find({categoria: categoria._id}).sort({date: "desc"}).lean().then((postagens) => {
					res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
				}).catch((erro) => {
					req.flash("error_msg", "Houve um erro ao listar as postagens!")
					res.redirect("/categorias")
				})
			}
			else {
				req.flash("error_msg", "Esta categoria não existe!")
				res.redirect("/categorias")
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao carregar a página dessa categoria!")
			res.redirect("/categorias")
		})
	})
	
	//Grupos de rotas
	app.use('/admin', admin) //Todas as rotas desse arquivo começam com /admin
	app.use('/usuarios', usuarios) //Todas as rotas desse arquivo começam com /usuarios
	
	//Qualquer rota não encontrada exibe a página 404 (deve ficar depois de todas as rotas)
	app.use((req, res) => {
		res.status(404).render("404")
	})

//Outros
const PORT = 8081 //Porta onde o servidor vai rodar

app.listen(PORT, function(){ //Precisar ser a ultima linha do codigo
	console.log("Servidor Rodando!");
});