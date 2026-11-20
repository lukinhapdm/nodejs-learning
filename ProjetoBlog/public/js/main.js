//Scripts do front-end do blog

//Gera o slug a partir de um texto (ex: "Introdução ao Node" -> "introducao-ao-node")
function gerarSlug(texto) {
	return texto
		.normalize("NFD").replace(/[̀-ͯ]/g, "") //Remove os acentos
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "") //Remove caracteres especiais
		.replace(/\s+/g, "-") //Troca os espaços por hífen
		.replace(/-+/g, "-")
}

document.addEventListener("DOMContentLoaded", () => {

	//Preenche o slug automaticamente enquanto o título/nome é digitado
	//O campo de origem precisa do atributo data-slug-origem com o id do campo de slug
	document.querySelectorAll("[data-slug-origem]").forEach((origem) => {
		const campoSlug = document.getElementById(origem.dataset.slugOrigem)
		let editadoManualmente = campoSlug.value != "" //Na edição o slug já existe, então não é sobrescrito

		campoSlug.addEventListener("input", () => { editadoManualmente = true })
		origem.addEventListener("input", () => {
			if (!editadoManualmente) {
				campoSlug.value = gerarSlug(origem.value)
			}
		})
	})

	//Pede confirmação antes de deletar (links e formulários com o atributo data-confirmar)
	document.querySelectorAll("[data-confirmar]").forEach((elemento) => {
		const evento = elemento.tagName == "FORM" ? "submit" : "click"
		elemento.addEventListener(evento, (e) => {
			if (!confirm(elemento.dataset.confirmar)) {
				e.preventDefault() //Cancela a ação se o usuário clicar em "Cancelar"
			}
		})
	})

	//Fecha os alertas de mensagem automaticamente depois de 5 segundos
	document.querySelectorAll(".alert-dismissible").forEach((alerta) => {
		setTimeout(() => bootstrap.Alert.getOrCreateInstance(alerta).close(), 5000)
	})
})
