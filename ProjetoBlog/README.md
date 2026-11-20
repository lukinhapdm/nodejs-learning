# ProjetoBlog

Blog com painel administrativo desenvolvido como projeto final do **Curso de Node.js** do professor **Victor Lima** (Guia do Programador).

A aplicação permite cadastrar categorias e postagens por meio de uma área restrita a administradores, além de registro, login e logout de usuários.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Node.js](https://nodejs.org) | Plataforma de execução |
| [Express](https://expressjs.com) | Servidor e rotas |
| [Express Handlebars](https://github.com/express-handlebars/express-handlebars) | Template engine das views |
| [MongoDB](https://www.mongodb.com) + [Mongoose](https://mongoosejs.com) | Banco de dados e models |
| [Passport](https://www.passportjs.org) + passport-local | Autenticação |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Hash das senhas |
| express-session + connect-flash | Sessões e mensagens de feedback |
| [Bootstrap 5](https://getbootstrap.com) | Estilização |
| [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts) | Fonte dos títulos |

## Funcionalidades

**Área pública**
- Home com as postagens mais recentes e barra lateral de categorias
- Busca de postagens pelo título ou descrição
- Página de cada postagem (acessada pelo slug) com tempo de leitura e postagens relacionadas da mesma categoria
- Listagem de categorias com a quantidade de postagens de cada uma
- Registro, login e logout de usuários, com menu do usuário na navbar
- Página 404 para rotas inexistentes
- Layout responsivo (funciona no celular)

**Área administrativa** (`/admin`, apenas para usuários admin)
- Dashboard com o total de postagens, categorias e usuários e as últimas postagens
- CRUD de categorias
- CRUD de postagens
- Slug gerado automaticamente a partir do título/nome
- Confirmação antes de deletar
- Listagem, edição e exclusão de usuários *(extra, além do curso)*

## Telas

| Home | Postagem |
| --- | --- |
| ![Home](docs/screenshots/home.png) | ![Página da postagem](docs/screenshots/postagem.png) |

| Painel admin | Painel admin: postagens |
| --- | --- |
| ![Dashboard do painel admin](docs/screenshots/admin.png) | ![Lista de postagens no painel admin](docs/screenshots/admin-postagens.png) |

> As imagens usam dados de exemplo.

## Estrutura de pastas

```
ProjetoBlog/
├── app.js              # Arquivo principal: configurações, rotas públicas e servidor
├── config/
│   └── auth.js         # Estratégia de login do Passport
├── helpers/
│   ├── eAdmin.js       # Middleware que restringe rotas a administradores
│   └── handlebars.js   # Helpers usados nas views (data, tempo de leitura...)
├── models/
│   ├── Categoria.js
│   ├── Postagem.js
│   └── Usuario.js
├── routes/
│   ├── admin.js        # Rotas /admin (categorias, postagens e usuários)
│   └── usuario.js      # Rotas /usuarios (registro, login e logout)
├── docs/screenshots/   # Imagens usadas neste README
├── public/             # Arquivos estáticos (Bootstrap, css/style.css e js/main.js)
└── views/              # Templates Handlebars
    ├── layouts/        # Layout principal (main)
    ├── partials/       # Navbar, footer e mensagens
    ├── admin/
    ├── categorias/
    ├── postagem/
    └── usuarios/
```

## Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Home com as postagens |
| GET | `/busca?q=termo` | Busca de postagens |
| GET | `/postagem/:slug` | Página da postagem |
| GET | `/categorias` | Lista de categorias |
| GET | `/categorias/:slug` | Postagens de uma categoria |
| GET/POST | `/usuarios/registro` | Registro de usuário |
| GET/POST | `/usuarios/login` | Login |
| GET | `/usuarios/logout` | Logout |
| GET | `/admin` | Painel administrativo |
| GET | `/admin/categorias` | Lista de categorias |
| GET | `/admin/categorias/add` | Formulário de nova categoria |
| POST | `/admin/categorias/new` | Cadastra categoria |
| GET | `/admin/categorias/edit/:id` | Formulário de edição |
| POST | `/admin/categorias/edit` | Salva a edição |
| POST | `/admin/categorias/delete` | Deleta categoria |
| GET | `/admin/postagens` | Lista de postagens |
| GET | `/admin/postagens/add` | Formulário de nova postagem |
| POST | `/admin/postagens/new` | Cadastra postagem |
| GET | `/admin/postagens/edit/:id` | Formulário de edição |
| POST | `/admin/postagens/edit` | Salva a edição |
| GET | `/admin/postagens/delete/:id` | Deleta postagem |
| GET | `/admin/usuarios` | Lista de usuários |
| GET | `/admin/usuarios/edit/:id` | Formulário de edição |
| POST | `/admin/usuarios/edit` | Salva a edição |
| POST | `/admin/usuarios/delete` | Deleta usuário |

## Como executar

### Pré-requisitos
- [Node.js](https://nodejs.org) instalado
- [MongoDB](https://www.mongodb.com/try/download/community) rodando localmente na porta padrão (`27017`)

### Passos

1. Entre na pasta do projeto e instale as dependências:

```bash
cd ProjetoBlog
```

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Acesse <http://localhost:8081>.

O banco `blogapp` é criado automaticamente pelo MongoDB na primeira gravação.

### Criando um administrador

Todo usuário é criado como comum (`eAdmin: 0`). Para liberar o acesso ao painel `/admin`, registre um usuário pelo site e altere o campo no MongoDB:

```bash
mongosh blogapp --eval 'db.usuarios.updateOne({email: "seu@email.com"}, {$set: {eAdmin: 1}})'
```

Depois, faça logout e login novamente.

## Créditos

Projeto desenvolvido acompanhando o [Curso de Node.js](https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B) do professor Victor Lima.
