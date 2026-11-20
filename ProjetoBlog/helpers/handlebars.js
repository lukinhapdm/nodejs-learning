//Funções (helpers) que podem ser usadas dentro das views do Handlebars
module.exports = {
	//Formata a data no padrão dd/mm/aaaa
	formatDate: (data) => new Date(data).toLocaleDateString('pt-BR'),

	//Compara dois valores (usado para marcar a categoria selecionada)
	eq: (a, b) => String(a) == String(b),

	//Calcula o tempo de leitura considerando 200 palavras por minuto
	tempoLeitura: (texto) => {
		const palavras = String(texto || "").trim().split(/\s+/).length
		return Math.max(1, Math.ceil(palavras / 200))
	},

	//Escolhe uma das 6 cores de categoria (cat-0 a cat-5) a partir do nome, assim a mesma categoria sempre tem a mesma cor
	corCategoria: (nome) => {
		let hash = 0
		for (const letra of String(nome || "")) {
			hash = (hash * 17 + letra.charCodeAt(0)) % 1000003 //Gera um número a partir das letras do nome
		}
		return "cat-" + (hash % 6)
	},

	//Primeira letra do texto (usada no ícone das categorias)
	inicial: (texto) => String(texto || "?").charAt(0).toUpperCase(),

	//Retorna "active" quando a página atual começa com a rota informada (destaca o link na navbar)
	ativo: (pathAtual, rota) => {
		if (rota == "/") {
			return pathAtual == "/" ? "active" : ""
		}
		return String(pathAtual).startsWith(rota) ? "active" : ""
	}
}
