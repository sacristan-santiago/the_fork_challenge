exports.up = async (knex) => {
  await knex.schema.createTable('restaurant', (table) => {
    table.uuid('restaurant_uuid');
    table.string('name');
    table.string('country_code');
    table.primary('restaurant_uuid');
    table.foreign('country_code').references('country.country_code');
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('restaurant');
};
