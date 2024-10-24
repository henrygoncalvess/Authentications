# API com Basic Authentication, Bearer e JWT. 

### licença e tecnologias utilizadas

<img src="https://img.shields.io/github/license/henrygoncalvess/JWT_auth?style=for-the-badge&labelColor=gray&color=97ca00">
<!-- <img src="https://img.shields.io/badge/mysql-8.0.39-4479A1?style=for-the-badge&logo=mysql&logoColor=white&labelColor=gray">
<img src="https://img.shields.io/badge/express-4.21.1-000000?style=for-the-badge&logo=express&logoColor=black&labelColor=gray">
<img src="https://img.shields.io/badge/cors-2.8.5-royalblue?style=for-the-badge&logo=cors&logoColor=black&labelColor=gray">
<img src="https://img.shields.io/badge/node-20.16.0-5FA04E?style=for-the-badge&logo=node.js&logoColor=5FA04E&labelColor=gray">
<img src="https://img.shields.io/badge/npm-10.8.2-CB3837?style=for-the-badge&logo=npm&logoColor=CB3837&labelColor=gray">
<img src="https://img.shields.io/badge/postman-11.16.0-FF6C37?style=for-the-badge&logo=postman&logoColor=FF6C37&labelColor=gray">
<img src="https://img.shields.io/badge/dotenv-16.4.5-ECD53F?style=for-the-badge&logo=dotenv&logoColor=yellow&labelColor=gray"> -->

criando API com diferentes autenticações
  
<details open="open">
<summary>Tabela de Conteúdos</summary>
  
- [Instrução de instalação](#instrução-de-instalação)
  - [Clonando Repositório](#clonando-repositório)
  - [Pré-requisitos](#pré-requisitos)
  - [Etapas](#etapas)
- [Instrução de uso](#instrução-de-uso)
- [API Endpoints](#api-endpoints)
  
</details>

<br>

## Instrução de instalação

### Clonando Repositório
No Terminal, certifique de que você está na pasta onde vai ficar o repositório

```repositorios\clonados```
``` bash
git clone https://github.com/henrygoncalvess/API_auth.git
```

<br>

### Pré-requisitos
- **MySQL** - [Tutorial de instalação](https://www.alura.com.br/artigos/mysql-do-download-e-instalacao-ate-sua-primeira-tabela)

Para a instalação dos frameworks, middlewares e dependências que possibilitaram a criação da API  
e a conexão com o MySQL é necessário que você possua as seguintes ferramentas:

- **Node.js** - [Tutorial de instalação](https://nodejs.org/pt)

- **npm** - [Tutorial de instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Para fazer requisições e testar a conexão com o banco:
- **Postman** - [Tutorial de instalação](https://www.postman.com/downloads/)

> [!tip]
> Também é possível fazer requisições pela linha de comando.  
[Clique aqui](https://www.campuscode.com.br/conteudos/comandos-curl-para-testar-requisicoes-api) para aprender a fazer requisições pelo terminal

<br>

### Etapas

#### 1. crie seu projeto Node.js

`repositorios\clonados\API_auth`
``` bash
npm init
```

#### 2. em seguida, instale as dependências necessárias para o funcionamento do projeto.

`repositorios\clonados\API_auth`
``` bash
npm install cors@4.24.1 mysql2@3.11.3 dotenv@16.4.5 express@4.21.1
```

#### 3. crie o arquivo `.env` na raiz do projeto - `repositorios\clonados\CRUD_MySQL`, e configure as variáveis de acordo com seus dados do MySQL.

``` .env
HOST=seu_host #exemplo: localhost
USER=seu_usuario #exemplo: root
PASSWORD=sua_senha
DB=nome_do_seu_database
TABLE=sua_tabela
```

<br>

## Instrução de uso

Inicie o servidor local e veja [API Endpoints](#api-endpoints) para testar as respostas da api

`repositorios\clonados\API_auth\src`
``` bash
node server.js
```

## API Endpoints

No Postman *ou na linha de comando*  
teste as respostas da conexão com o MySQL seguindo os **endpoints** abaixo.

> [!tip]
> acesse este link, caso não saiba utilizar o Postman para fazer requisições [Postman](https://learning.postman.com/docs/introduction/overview/)  
> acesse este link, caso não saiba fazer requisições pela linha de comando [Clique aqui](https://www.campuscode.com.br/conteudos/comandos-curl-para-testar-requisicoes-api)

<br>

Rota | Descrição
--- | :---:
***GET*** ` http://localhost:3000/api/user ` | Lista todas as informações da tabela - [ver JSON](#get---response)
***POST*** ` http://localhost:3000/api/new/user ` | Adiciona um novo item na tabela - [ver JSON](#post---request)
***PUT*** ` http://localhost:3000/api/update/user ` | Atualiza as informações da tabela - [ver JSON](#put---request)
***DELETE*** ` http://localhost:3000/api/delete/user ` | Deleta uma linha da tabela - [ver JSON](#delete---request)

<br>

### Exemplo de Banco de Dados

``` python
+------------+---------------+------+---------+ +-----------+------------+------+------+
| Field      | Type          | Null | Default | | nome      | nascimento | sexo | peso |
+------------+---------------+------+---------+ +-----------+------------+------+------+
| nome       | varchar(30)   | NO   | NULL    | | Miguel    | 2004-10-29 | M    | 55.3 |
| nascimento | date          | NO   | NULL    | | Pedro     | 2001-02-04 | M    | 80.9 |
| sexo       | enum('M','F') | NO   | NULL    | | Valentina | 1989-04-07 | F    | 62.1 |
| peso       | float         | YES  | NULL    | +-----------+------------+------+------+
+------------+---------------+------+---------+
```

<br>

### GET - ***Response***

``` json
[
    {
        "username": "pedro",
        "password": "111111"
    },
    {
        "username": "maria",
        "password": "22221"
    },
    {
        "username": "marcelo",
        "password": "321321"
    }
]
```

<br>

### POST - ***Request***

``` json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

Response | CODE
:---: | :---:
*http status* | **`201 CREATED`**

<br>

### PUT - ***Request***

_linha atual_
``` python
+-------+------------+
| nome  | nascimento |
+-------+------------+
| Pedro | 2001-02-04 |
+-------+------------+
```

***Request***

`"usuario"`: parâmetro para localizar a linha que será alterada.  
informar apenas os parâmetros a serem alterados
``` json
{
    "usuario": "Pedro",
    "nascimento": "1999-09-09"
}
```

***Response***

``` json
{
    "affectedRows": 1,
    "info": "Rows matched: 1  Changed: 1  Warnings: 0",
    "serverStatus": 34,
    "changedRows": 1
}
```

_linha alterada_
``` python
+-------+------------+
| nome  | nascimento |
+-------+------------+
| Pedro | 1999-09-09 |
+-------+------------+
```

<br>

### DELETE - ***Request***

``` json
{
  "deleteUser": "pedro-junior"
}
```
Response | CODE
:---: | :---:
*http status* | **`200 OK`**
