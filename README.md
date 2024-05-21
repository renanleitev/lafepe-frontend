# Lafepe Frontend

Projeto frontend para o site da Lafepe, feito com ```React``` e ```Vite```.

## Instalação

Para instalar as dependências do projeto, execute o comando:

```
npm install
```

## Iniciando

Para inciar a aplicação, execute o comando:

```
npm start
```

Acesse ```localhost:9090``` no seu navegador para acessar o site.

## Docker

Para rodar o container docker, faça a build da imagem:

```
docker build . -t lafepe-frontend
```

Para executar o container docker:

```
docker run -p 9090:80 lafepe-frontend --name lafepe-frontend
```

Acesse ```localhost:9090``` no seu navegador para acessar o site.

## Alterando a API backend

Você pode alterar a URL da API backend no arquivo ```axios.js```:
   
```
const backendAPI = import.meta.env.VITE_BACKEND_URL || <URL_SERVIDOR>;
```

Você pode alterar a URL da API backend criando um arquivo .env.local e inserindo a URL do servidor:

```
VITE_BACKEND_URL=<URL_SERVIDOR>
```

## Equipe

1. Flávio Raposo
2. João Pedro Marinho
3. José Adeilton
4. Renan Leite Vieira
5. Rian Vinícius
6. Robério José
