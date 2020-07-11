// Update with your config settings.
const {resolve} = require('path');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'crud_knex',
      user: 'postgres',
      password: 'docker'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: resolve(__dirname, 'src', 'database', 'seeds')
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
