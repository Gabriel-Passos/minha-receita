
exports.up = function(knex) {
  return knex.schema.createTable('receitas', function(table){
    table.increments();

    table.string('nomeReceita').notNullable();
    table.string('ingredientes').notNullable();
    table.string('preparo').notNullable();
    table.integer('porcao').notNullable();

    table.string('receita_id').notNullable();

    table.foreign('receita_id').references('id').inTable('chefs');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('receitas');
};
