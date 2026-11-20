# Curso de Node.js

Repositório com os exercícios e projetos desenvolvidos durante o [Curso de Node.js](https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B) do professor **Victor Lima** (Guia do Programador).

O curso aborda Node.js, Express, Handlebars, MySQL com Sequelize e MongoDB com Mongoose. Cada aula foi registrada em um commit (`Aula: <tema>`), e o histórico pode ser usado como roteiro de estudo.

## Conteúdo

| Pasta | Tema | Tecnologias |
| --- | --- | --- |
| [`HelloWorld`](./HelloWorld) | Primeiro código e módulos | Node.js |
| [`Test`](./Test) | Módulos (`require` / `module.exports`) | Node.js |
| [`Test2`](./Test2) | Servidor HTTP nativo | Node.js (`http`) |
| [`Test3`](./Test3) | Rotas, parâmetros e exibição de HTML | Express |
| [`TestSql`](./TestSql) | Criação e manipulação de tabelas | MySQL |
| [`TestSequelize`](./TestSequelize) | Conexão e models | Sequelize, MySQL |
| [`Projeto1`](./Projeto1) | Cadastro, listagem e exclusão de posts | Express, Handlebars, Sequelize, MySQL |
| [`TestMongoose`](./TestMongoose) | Primeiros passos com MongoDB | Mongoose |
| [`ProjetoBlog`](./ProjetoBlog) | **Projeto final**: blog com painel admin e autenticação | Express, Handlebars, Mongoose, Passport |

### Projeto final: ProjetoBlog

![Home do ProjetoBlog](ProjetoBlog/docs/screenshots/home.png)

Veja o [README do ProjetoBlog](./ProjetoBlog/README.md) para detalhes do projeto final.

## Tecnologias utilizadas

**Back-end**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=black)

**Banco de dados**

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

**Front-end**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white) ![Handlebars](https://img.shields.io/badge/Handlebars-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![Poppins](https://img.shields.io/badge/Fonte%20Poppins-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)

**Ferramentas**

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

**Outras bibliotecas:** body-parser (dados dos formulários), express-session e connect-flash (sessões e mensagens de feedback) e bcryptjs (hash de senhas).

## Como executar um projeto

Cada pasta é independente. As dependências não ficam no repositório, então instale-as antes de rodar:

```bash
cd NomeDaPasta
```

```bash
npm install
```

```bash
node app.js
```

O arquivo principal varia por pasta (`app.js`, `index.js`, `teste.js`, `mongoose.js`). Os projetos com banco de dados precisam do MySQL ou do MongoDB rodando localmente.
