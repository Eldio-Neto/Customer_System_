# Projeto Customer System

## Descrição
Este projeto é um sistema de gerenciamento de clientes, com um front-end em React e um back-end em Laravel.

## Configuração

### Front-end (React)
1. Clone este repositório.
2. Navegue até a pasta do front-end: `cd customer_system/frontend`
3. Execute o comando `npm install` para instalar as dependências.
4. Execute o comando `npm run build` para iniciar o servidor de desenvolvimento do React.

### Back-end (Laravel)
1. Navegue até a pasta do back-end: `cd customer_system/backend`
2. Execute o comando `composer install` para instalar as dependências do Laravel.
3. Copie o arquivo `.env.example` e renomeie para `.env`.
4. Abra o arquivo `.env` e configure as variáveis de ambiente, como por exemplo as credenciais do banco de dados.
5. Execute o comando `php artisan migrate` para rodar as migrations e criar as tabelas do banco de dados.
6. Opcionalmente, execute o comando `php artisan db:seed --class=pedido_status_Seeder` para popular o banco de dados com dados de exemplo.

## Requisitos
- Node.js
- PHP
- Composer
- MySQL
- O back-end deve rodar na porta 8000
## Licença
Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
