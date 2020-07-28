# Upload de arquivos local e para o CDN da amazon

## Sobre o repositório
O repositório trata-se de uma API Rest que faz upload de imagens, tanto para o ambiente local quanto para o S3 da amazon (as configurações devem ser ajustadas no arquivo com as variáveis de ambiente).

## Executando o projeto

 - Instale as dependências rodando `npm install`
  - Configure no arquivo *knexfile* as informação do banco de dados e o crie manualmente
  - Ronomeie o arquivo *.env.exemplo* para *.env*
  - Execute `npx knex migrate:latest` para criar as tabelas do banco de dados
  - Execute `npm run dev` ou `npm start` para rodar o servidor




<hr />
<small>@elieudo_maia</small>