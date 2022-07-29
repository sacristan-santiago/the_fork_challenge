exports.up = async (knex) => {
  await knex.schema.createTable('country', (table) => {
    table.string('country_code');
    table.specificType('locales', 'text[]');
    table.primary('country_code');
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('country');
};
