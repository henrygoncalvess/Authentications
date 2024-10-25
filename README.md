# API com Basic Authentication, Bearer e JWT. 

### licença e tecnologias utilizadas

<img src="https://img.shields.io/github/license/henrygoncalvess/JWT_auth?style=for-the-badge&labelColor=gray&color=97ca00"> <img src="https://img.shields.io/badge/express-4.21.1-000000?style=for-the-badge&logo=express&logoColor=black&labelColor=gray">
<!-- <img src="https://img.shields.io/badge/cors-2.8.5-royalblue?style=for-the-badge&logo=cors&logoColor=black&labelColor=gray"> -->
<!-- <img src="https://img.shields.io/badge/node-20.16.0-5FA04E?style=for-the-badge&logo=node.js&logoColor=5FA04E&labelColor=gray"> -->
<!-- <img src="https://img.shields.io/badge/npm-10.8.2-CB3837?style=for-the-badge&logo=npm&logoColor=CB3837&labelColor=gray"> -->
<!-- <img src="https://img.shields.io/badge/postman-11.16.0-FF6C37?style=for-the-badge&logo=postman&logoColor=FF6C37&labelColor=gray"> -->
<!-- <img src="https://img.shields.io/badge/dotenv-16.4.5-ECD53F?style=for-the-badge&logo=dotenv&logoColor=yellow&labelColor=gray"> -->

Documentação simples das diferentes formas de autenticações.  
Contém informações do tipo: como funciona, para que serve, quando usá-la e quais são as limitações.
  
<details open="open">
<summary>Tabela de Conteúdos</summary>
  
- [Instrução de instalação](#instrução-de-instalação)
  - [Clonando Repositório](#clonando-repositório)
  - [Pré-requisitos](#pré-requisitos)
  - [Etapas](#etapas)
- [Instrução de uso](#instrução-de-uso)
  
</details>

<br>

## Estrutura de pastas

├──**Authentications/**  
│&nbsp; &nbsp; &nbsp;├──[basic_auth/](basic_auth)  
│&nbsp; &nbsp; &nbsp;│&nbsp; &nbsp; &nbsp; \`- - -[server.js](basic_auth/server.js)  
│&nbsp; &nbsp; &nbsp;├──[api-key_auth/](api-key_auth)  
│&nbsp; &nbsp; &nbsp;│&nbsp; &nbsp; &nbsp; \`- - -[server.js](basic_auth/server.js)  
│&nbsp; &nbsp; &nbsp;├──[token_auth/](token_auth)  
│&nbsp; &nbsp; &nbsp;│&nbsp; &nbsp; &nbsp; \`- - -[server.js](basic_auth/server.js)  
│&nbsp; &nbsp; &nbsp;├──[jwt_auth/](jwt_auth)  
│&nbsp; &nbsp; &nbsp;│&nbsp; &nbsp; &nbsp; \`- - -[server.js](basic_auth/server.js)  

<br>

## Instrução de instalação

### Clonando Repositório
No Terminal, certifique de que você está na pasta onde vai ficar o repositório

```repositorios\clonados```
``` bash
git clone https://github.com/henrygoncalvess/Authentications.git
```

<br>

### Pré-requisitos
Para a instalação dos frameworks, middlewares e dependências é necessário que você possua as seguintes ferramentas:

- **Node.js** - [Tutorial de instalação](https://nodejs.org/pt)

- **npm** - [Tutorial de instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Para fazer requisições e testar as autenticações:
- **Postman** - [Tutorial de instalação](https://www.postman.com/downloads/)

> [!tip]
> Também é possível fazer requisições pela linha de comando.  
[Clique aqui](https://www.campuscode.com.br/conteudos/comandos-curl-para-testar-requisicoes-api) para aprender a fazer requisições pelo terminal

<br>

### Etapas

#### 1. crie seu projeto Node.js

`repositorios\clonados\Authentications`
``` bash
npm init
```

#### 2. em seguida, instale as dependências necessárias para o funcionamento das autenticações.

`repositorios\clonados\Authentications`
``` bash
npm install express@4.21.1
```

<br>

## Instrução de uso

Inicie o servidor local  

`repositorios\clonados\Authentications`
``` bash
node server.js
```