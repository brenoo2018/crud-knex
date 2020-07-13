// importando o arquivo de configuração p/ utilizar knex
const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development)

module.exports = knex;