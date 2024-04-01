# SmartNest

SmartNest é uma plataforma que oferece praticidade e eficiência no gerenciamento de dispositivos inteligentes em residências. Com ela, é possível personalizar e automatizar cada ambiente do seu lar de forma simples e intuitiva. Vale ressaltar que, embora os dispositivos inicialmente sejam mockados, o projeto está pronto para integração com API externa de dispositivos inteligentes reais.

## Como rodar a aplicação ?

Para rodar a aplicação, execute os seguintes comandos:

```
$ git clone git@github.com:webacademyufam/hands-on-t2-03-smartnest.git
$ cd hands-on-t2-03-smartnest
$ cp .env.example .env
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example backend/.env
$ cd frontend && npm install --force && cd ..
$ cd backend && npm install && cd ..
$ docker compose up
```

## PhpMyAdmin

```
URL: http://localhost:8010
Server: db ou db_test (serviço do docker compose)
Username: root
Senha: smartnest2024handson@root
Banco de Dados: smartnest ou smartnest_test
```

## Swagger
```
URL: http://localhost:3333/docs
```

## Insomnia

O arquivo `backend/.insomnia/Insomnia.json` pode ser importado no Insomnia (API Client) para testar os endpoints do Backend. Para importar os endpoints no Insomnia, acesse a opção Preferences do menu Application, clique na aba Data, e escolha a opção Import Data.

## Frontend
```
URL: http://localhost:3366
```
