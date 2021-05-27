# 🎉 Expressed-gen 
An Expressed Sequelized generator

<a href="https://github.com/sounishnath003/Expressed-sequelize-generator/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/sounishnath003/Expressed-sequelize-generator?color=green&style=flat-square"></a>
<a href="https://github.com/sounishnath003/Expressed-sequelize-generator/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/sounishnath003/Expressed-sequelize-generator?style=flat-square"></a>

**Express** or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

**Sequelize** is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

> :pencil: A Small Note regading the generator

This repository is firstly made for my folder-structer and modules I generally used in my backend development work!

Which is bare minimum and the most common but best practices when building backend in node.

The generator comes with in-built **TypeScript** supports with **Sequelize ORM** (Object Relational Mapping) which pre-configued with **SQLITE** setup, however I am now working on various relational databases like - 

1. PostgreSQL
2. MySQL
3. MariaDB
4. SQL Server
5. SQLITE3



## 🎉 Usuage Process

### Install Npm module
```bash
npm install expressed-gen -g
```

**OR**

```bash
npx expressed-gen demo-backend
```

### ⚡ How to use?

The easiest way to use the generator by first installing the module using `npm i expressed-gen -g` and then do the following...

1. 🐱‍🏍 Bootstrap in a empty project folder 
    
    ```bash
    expressed-gen .
    yarn dev
    ```

2. ⚡ If you want to create project with named in CLI 

    ```bash
    expressed-gen demo-backend
    yarn dev
    ```

This is how it's works...

## Pre-bundled Modules

The Generator comes with various and bare **minimal** modules to work with, which **fastifies** you development workflow while maintaining the **folder configurations** and again and again **modules configurations**, Which stops you from **re-invent the wheel**.

The support of `TypeScript` and corresponding `@types` declarations are already back packed.

### 🦝 Dependencies

- express
- sequelize orm
- bcrypt
- cors
- express-fileupload
- jsonwebtoken
- slugify
- http-errors
- dotenv
- uuid

### 📌 Dev dependencies

- morgan
- nodemon
- sqlite3



## 🔥 Releases

### Patch v1.0.13 includes
- ✅ Environment Secrets Token are now pre-generated 64bit

### Patch v1.0.9 includes
- 🙈 Fix Issues spawning up a thread for CLI
- 😍 Compatible with macOS - (**ENONET SHELL ISSUE SOLVED**)

### Patch v1.0.7 includes
- ⚡ Rapid fast backend development.
-  💀 improved error handling CLI commands
- 🎉 More improved file configurations
- 🔥 `http-errors` preconfigured for HttpErrors handlings
- 🐱‍🏍 Prefetched RDMS lists for ORM
- ⚡ Pre-bundled with -  `express`, `Sequelized`, `jsonwebtoken`, `express-file-upload`, `slugify`, `morgan`
- ⭐ For faster development pre-packed with `sqlite3` database (Don't need to take hassles with DB_Connections) 
- ✅ TypeScript Ready.

<br>

**NPM Module:** [Expresssed-gen Download](https://www.npmjs.com/package/expresssed-gen)
