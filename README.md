## Status do Projeto

[![Completo](https://img.shields.io/badge/Projeto-Completo-green)](#)

---

# Aplicação Node.js com Express e MongoDB

Este é um projeto simples desenvolvido com Node.js, Express, MongoDB e Handlebars. Ele demonstra a configuração básica de um servidor com integração ao banco de dados MongoDB.

---

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- Node.js (versão 16 ou superior)
- MongoDB (em execução localmente)

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

---

## Como Executar

1. Certifique-se de que o MongoDB esteja em execução localmente.

2. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

3. O servidor estará disponível em: `http://localhost:8081`

---

## Funcionalidades

- Integração com MongoDB para armazenar dados.
- Configuração de sessões com `express-session`.
- Mensagens de feedback com `connect-flash`.
- Renderização de views com `express-handlebars`.

---

## Estrutura do Projeto

```
.
├── app.js                # Arquivo principal do servidor
├── routes/adm.js         # Rotas de administração
├── public/               # Arquivos estáticos (CSS, JS, etc.)
├── views/                # Templates Handlebars
├── package.json          # Configuração do projeto e dependências
└── package-lock.json     # Versões travadas das dependências
```

---

## Dependências

As principais dependências do projeto são:

- **express**: Framework web para Node.js.
- **mongoose**: ODM para MongoDB.
- **express-handlebars**: Motor de templates para renderização de views.
- **body-parser**: Middleware para análise do corpo das requisições.
- **express-session**: Gerenciamento de sessões no servidor.
- **connect-flash**: Mensagens de feedback.

### Versões

```json
{
  "body-parser": "^1.20.2",
  "connect-flash": "^0.1.1",
  "express": "^4.19.2",
  "express-handlebars": "^7.1.2",
  "express-session": "^1.18.0",
  "mongoose": "^8.4.1"
}
```

---

## Configuração do Banco de Dados

O projeto usa MongoDB com a URL padrão local:

```
mongodb://localhost/aplicacaoteste
```

Certifique-se de que o MongoDB esteja ativo antes de iniciar o servidor.

