# Entendendo autorização e autenticação

### licença e tecnologias utilizadas

<img src="https://img.shields.io/github/license/henrygoncalvess/Authentications?style=for-the-badge&labelColor=gray&color=97ca00"> <a href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/express-4.21.1-000000?style=for-the-badge&logo=express&logoColor=black&labelColor=gray"></a> <a href="https://jwt.io/"><img src="https://img.shields.io/badge/jwt-9.0.2-FD3456?style=for-the-badge&logo=jsonwebtokens&logoColor=black&labelColor=white"></a> <a href="https://github.com/henrygoncalvess"><img src="https://img.shields.io/badge/bcrypt-2.4.3-003A70?style=for-the-badge&logo=letsencrypt&logoColor=darkblue&labelColor=gray"></a> <a href="https://www.npmjs.com/package/cors"><img src="https://img.shields.io/badge/cors-2.8.5-royalblue?style=for-the-badge&logo=cors&logoColor=black&labelColor=gray"></a>

Documentação simples das diferentes formas de autenticação.

Contém informações do tipo:
- como funciona
- para que serve?
- quando usá-las e quais são as limitações.
  
<details open="open">
<summary>Tabela de Conteúdos</summary>
  
- [Instrução de instalação](#instrução-de-instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando Repositório](#clonando-repositório)
  - [Etapas](#etapas)
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

- **Node.js** - [Tutorial de instalação](https://nodejs.org/pt)

- **npm** - [Tutorial de instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Para fazer requisições e testar as autenticações:
- **Postman** - [Tutorial de instalação](https://www.postman.com/downloads/)

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

### Etapas

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

    c ->>+ s: REGISTRO: nome e senha
    alt já registrado ¨ ¨
    s -->>+ c: msg: erro
    else não registrado
    s ->> s: criação do hash da senha
    s ->> s: armazenação do nome e senha
    s -->>- c: msg: usuário registrado
    end
    c ->>+ s: LOGIN: nome e senha
    alt já registrado
    s -->> c: msg de erro
    else não registrado
    s ->> s: criação do token JWT
    s -->>- c: envio do token
    end

    create participant m as Middleware
    c ->>+ m: acessa a rota protegida enviando o token JWT
    m ->> m: verificação do token JWT
    alt se o token não é válido
    m -->> c: msg: acesso negado
    else se o token é válido
    m -->>- c: msg: acesso permitido
    end
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
