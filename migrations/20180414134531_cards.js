exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cards', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.string('word');
      table.text('definition');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cards'),
  ]);
};
