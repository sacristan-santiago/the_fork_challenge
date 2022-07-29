exports.up = async (knex) => {
  await knex.schema.createTable('restaurant_has_image', (table) => {
    table.uuid('restaurant_uuid');
    table.uuid('image_uuid');
    table.primary(['restaurant_uuid', 'image_uuid']);
    table.foreign('restaurant_uuid').references('restaurant.restaurant_uuid');
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('restaurant_has_image');
};
