# Node.js Course

Repository with the exercises and projects built during the [Node.js Course](https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B) by instructor **Victor Lima** (Guia do Programador).

The course covers Node.js, Express, Handlebars, MySQL with Sequelize and MongoDB with Mongoose. The Bootstrap framework was used to assist in building the interface.

## Contents

| Folder | Topic | Technologies |
| --- | --- | --- |
| [`HelloWorld`](./HelloWorld) | First code and modules | Node.js |
| [`Test`](./Test) | Modules (`require` / `module.exports`) | Node.js |
| [`Test2`](./Test2) | Native HTTP server | Node.js (`http`) |
| [`Test3`](./Test3) | Routes, parameters and rendering HTML | Express |
| [`TestSql`](./TestSql) | Creating and manipulating tables | MySQL |
| [`TestSequelize`](./TestSequelize) | Connection and models | Sequelize, MySQL |
| [`Projeto1`](./Projeto1) | Creating, listing and deleting posts | Express, Handlebars, Sequelize, MySQL |
| [`TestMongoose`](./TestMongoose) | First steps with MongoDB | Mongoose |
| [`ProjetoBlog`](./ProjetoBlog) | **Final project**: blog with admin panel and authentication | Express, Handlebars, Mongoose, Passport |

### Final project: ProjetoBlog

![ProjetoBlog home page](ProjetoBlog/docs/screenshots/home.png)

See the [ProjetoBlog README](./ProjetoBlog/README.md) for details about the final project.

## Technologies used

**Back-end**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=black)

**Database**

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

**Front-end**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white) ![Handlebars](https://img.shields.io/badge/Handlebars-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![Poppins](https://img.shields.io/badge/Poppins%20Font-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)

**Tools**

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

**Other libraries:** body-parser (form data), express-session and connect-flash (sessions and feedback messages) and bcryptjs (password hashing).

## How to run a project

Each folder is independent. Dependencies are not stored in the repository, so install them before running:

```bash
cd FolderName
```

```bash
npm install
```

```bash
node app.js
```

The main file varies by folder (`app.js`, `index.js`, `teste.js`, `mongoose.js`). Projects that use a database need MySQL or MongoDB running locally.
