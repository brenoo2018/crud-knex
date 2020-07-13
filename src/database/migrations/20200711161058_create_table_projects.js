const { onUpdateTrigger } = require('../../../knexfile')

exports.up = async (knex) =>  knex.schema.createTable('projects', table => {
  table.increments('id'),
  table.string('title'),

  //relationship
  table.integer('user_id')
    .references('users.id')
    .notNullable()
    .onDelete('SET NULL')
    .onUpdate('CASCADE')

  table.timestamps(true, true)
}).then(() => knex.raw(onUpdateTrigger('projects'))) // disparando a trigger

exports.down = async knex => knex.schema.dropTable('projects')
