//Middleware que permite o acesso apenas a usuários admin
module.exports = {
	eAdmin: function(req, res, next){
		
		if(req.isAuthenticated() && req.user.eAdmin == 1){ //Verifica se está logado e se é admin
			return next(); //Libera o acesso à rota
		}
		
		req.flash("error_msg", "Acesso permitido apenas a Admin!")
		res.redirect("/")
		
	}
}