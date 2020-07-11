
exports.up = (knex) =>  knex.schema.createTable('projects', table => {
  table.increments('id'),
  table.string('title'),

  //relationship
  table.integer('user_id')
    .references('users.id')
    .notNullable()
    .onDelete('SET NULL')
    .onUpdate('CASCADE')

  table.timestamps(true, true)
});

exports.down = knex => knex.schema.dropTable('projects')
