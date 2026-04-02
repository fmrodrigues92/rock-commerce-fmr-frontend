# Rock Commerce Frontend

Frontend do projeto Rock Commerce, desenvolvido em **React** com **Vite**, consumindo a API backend em Laravel.

Este projeto foi construído para se comunicar com a API do catálogo de produtos e autenticação de usuários. O frontend roda em container Docker para facilitar a execução do ambiente sem necessidade de instalar Node.js localmente.

---

## Tecnologias

- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- Docker

---

## Funcionalidades

- Login de usuário
- Cadastro de usuário
- Logout
- Listagem de produtos
- Busca de produtos
- Filtro por categoria
- Paginação
- Detalhamento de produto
- Consumo de API autenticada via Bearer Token

---

## Estrutura do projeto

```
src/
├── api/
├── components/
│   ├── layout/
│   └── routes/
├── context/
├── pages/
│   ├── auth/
│   └── catalog/
├── routes/
├── App.jsx
└── main.jsx
```

---

## Requisitos

- Docker
- Docker Compose
- [Backend](https://github.com/fmrodrigues92/rock-commerce-fmr) do projeto rodando separadamente

---

## Execução com Docker

Clone o repositório:

```sh
git clone <url-do-repositorio>
cd rock-commerce-fmr-frontend
```

Copie o arquivo de ambiente, se existir `.env.example`:

```sh
cp .env.example .env
```

Suba o container:

```sh
docker-compose up -d
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

## Variáveis de ambiente

Exemplo de `.env`:

```env
APP_PORT=5173
VITE_API_URL=http://localhost:8000/api
```

### Significado

- `APP_PORT`: porta do frontend
- `VITE_API_URL`: URL base da API backend

---

## Autenticação

O token retornado pela API é armazenado no navegador e enviado automaticamente nas requisições protegidas.

Fluxo esperado:

1. usuário realiza cadastro ou login
2. o frontend recebe o token
3. o token é armazenado localmente
4. as próximas requisições usam Bearer Token automaticamente

---

## Telas

### Login
Tela para autenticação do usuário.

### Cadastro
Tela para registro de novo usuário.

### Produtos
Tela principal com:
- listagem de produtos
- busca
- filtro por categoria
- paginação

### Detalhe do produto
Tela com os dados completos do produto selecionado.

---

## Dependências principais

- `react-router-dom`
- `axios`
- `bootstrap`

---

## Observações

- este projeto depende do backend estar rodando corretamente
- as imagens dos produtos são carregadas a partir da API
- o frontend foi preparado para consumir endpoints protegidos com Sanctum via token Bearer

---

## Backend esperado

O frontend consome os seguintes endpoints principais:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/{id}`

---

## Autor .:: Fernando Menezes Rodrigues ::.

Projeto desenvolvido como parte de teste técnico, com foco em clareza, integração com API e facilidade de execução.