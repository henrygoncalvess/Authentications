# Entendendo autorização e autenticação

Documentação simples das diferentes formas de autenticação.

Contém informações do tipo:
- como funciona
- para que serve?
- quando usá-las e quais são as limitações.


<br>

**licença e tecnologias utilizadas**:  
<img src="https://img.shields.io/github/license/henrygoncalvess/Authentications?style=for-the-badge&labelColor=gray&color=97ca00"> <a href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/express-4.21.1-000000?style=for-the-badge&logo=express&logoColor=black&labelColor=gray"></a> <a href="https://jwt.io/"><img src="https://img.shields.io/badge/jwt-9.0.2-FD3456?style=for-the-badge&logo=jsonwebtokens&logoColor=black&labelColor=white"></a> <a href="https://www.npmjs.com/package/bcrypt"><img src="https://img.shields.io/badge/bcrypt-2.4.3-003A70?style=for-the-badge&logo=letsencrypt&logoColor=darkblue&labelColor=gray"></a> <a href="https://www.npmjs.com/package/cors"><img src="https://img.shields.io/badge/cors-2.8.5-royalblue?style=for-the-badge&logo=cors&logoColor=black&labelColor=gray"></a> <a href="https://nodejs.org/pt"><img src="https://img.shields.io/badge/node-20.16.0-5FA04E?style=for-the-badge&logo=node.js&logoColor=5FA04E&labelColor=gray"></a> <a href="https://learning.postman.com/docs/introduction/overview/"><img src="https://img.shields.io/badge/postman-11.16.0-FF6C37?style=for-the-badge&logo=postman&logoColor=FF6C37&labelColor=gray"></a>

**Insalador de pacotes**:  
<a href="https://docs.npmjs.com"><img src="https://img.shields.io/badge/npm-10.8.2-CB3837?style=for-the-badge&logo=npm&logoColor=CB3837&labelColor=gray"></a>

**Ponto de Entrada**:  
<span><img src="https://img.shields.io/badge/app.js-333333?style=for-the-badge"></span>

**Caminho**:  
<span><img src="https://img.shields.io/badge/api--key__auth/app.js-333333?style=for-the-badge"></span>, 
<span><img src="https://img.shields.io/badge/basic__auth/app.js-333333?style=for-the-badge"></span>, 
<span><img src="https://img.shields.io/badge/jwt__auth/app.js-333333?style=for-the-badge"></span>

<br>
  
<details open="open">
<summary>Tabela de Conteúdos</summary>
  
- [Instrução de instalação](#instrução-de-instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando Repositório](#clonando-repositório)
  - [Configuração do Projeto](#configuração-do-projeto)
- [Instrução de uso](#instrução-de-uso)
  - [Basic Auth](basic_auth/basic_auth.md)
  - [API Key Auth](api-key_auth/api-key_auth.md)
  - [JWT Auth](jwt_auth/jwt_auth.md)
- [Pequena introdução a JWT](#intro)
- [Resumo sobre as diferentes formas de autenticação](#resumo)
  
</details>

<br>

## Instrução de instalação

### Pré-requisitos
Para a instalação dos frameworks, middlewares e dependências é necessário que você possua as seguintes ferramentas:

- <img src="https://cdn.simpleicons.org/nodedotjs/5FA04E/5FA04E?viewbox=auto" width=24>&nbsp; **Node.js** - [Tutorial de instalação](https://nodejs.org/pt)

- <img src="https://cdn.simpleicons.org/npm/CB3837/CB3837?viewbox=auto" width=24>&nbsp; **npm** - [Tutorial de instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Para fazer requisições e testar as autenticações:
- <img src="https://cdn.simpleicons.org/postman/FF6C37/FF6C37?viewbox=auto" width=24>&nbsp; **Postman** - [Tutorial de instalação](https://www.postman.com/downloads/)

> [!tip]
> Também é possível fazer requisições pela linha de comando.  
[Clique aqui](https://www.campuscode.com.br/conteudos/comandos-curl-para-testar-requisicoes-api) para aprender a fazer requisições pelo terminal

<br>

### Clonando Repositório
No Terminal, certifique de que você está na pasta onde vai ficar o repositório

```repositorios\clonados```
``` bash
git clone https://github.com/henrygoncalvess/Authentications.git
```

<br>

### Configuração do Projeto

#### 1. crie seu projeto Node.js

`repositorios\clonados\Authentications`
``` bash
npm init
```

#### 2. em seguida, instale as dependências necessárias para o funcionamento das autenticações.

`repositorios\clonados\Authentications`
``` bash
npm install express@4.21.1 jsonwebtoken@9.0.2 bcryptjs@2.4.3 cors@2.8.5
```

<br>

## Instrução de uso

Veja a documentação das diferentes formas de autenticação para realizar os testes com requisições

- Basic Auth - [Documentação](basic_auth/basic_auth.md)
- API Key Auth - [Documentação](api-key_auth/api-key_auth.md)
- JWT Auth - [Documentação](jwt_auth/jwt_auth.md)

<br>

## <a name="intro">Pequena introdução a JWT</a>

``` mermaid
---
title: Fluxo de Autenticação
---
sequenceDiagram
    autonumber
    actor c as Cliente
    participant s as Servidor

    c ->> s: REGISTRO: nome e senha
    activate s
    alt já registrado
    s -->> c: msg: erro
    deactivate s
    else não registrado
    s ->> s: criação do hash da senha
    activate s
    s ->> s: armazenação do nome e senha
    s -->> c: msg: usuário registrado
    deactivate s
    end
    c ->> s: LOGIN: nome e senha
    activate s
    alt já registrado
    s -->> c: msg de erro
    deactivate s
    else não registrado
    s ->> s: criação do token JWT
    activate s
    s -->> c: envio do token
    deactivate s
    end
    c ->> c: armazena o token - local storage / session
    activate c
    c ->> s: acessa a rota protegida enviando o token JWT
    deactivate c
    activate s
    create participant m as Middleware
    s ->> m: verificação do token JWT
    deactivate s
    activate m
    alt se o token não é válido
    m -->> c: acesso negado
    deactivate m
    activate m
    else se o token é válido
    m -->> s: token decriptado/acesso permitido
    deactivate m
    activate s
    end
    s -->> c: conteúdo da rota
    deactivate s
```

<br>

## <a name="resumo">Resumo sobre as diferentes formas de autenticação</a>

Todos os métodos (exceto a autenticação com JWT) compartilham os seguintes aspectos em comum:

- **Envio de credenciais ou identificadores:**  
Seja um usuário e senha (`Basic Auth`), uma chave única (`API-Key Auth`) ou um token (`Token Auth`),
todos possuem o envio de uma identificação que valida a requisição.

- **Inclusão no Header da Requisição:**  
Todos são geralmente enviados no Header da requisição, em campos como `Authorization` (Basic e Bearer Tokens)
ou em um cabeçalho customizado no caso da API Key.

- **Validação no Servidor:**  
Ao receber a requisição, o servidor verifica as credenciais para decidir se autoriza ou nega o acesso aos recursos.

- **Controle de Acesso:**  
Se a validação for bem-sucedida, o servidor segue com o processamento da requisição e então responde.
