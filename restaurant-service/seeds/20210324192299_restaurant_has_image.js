const restaurantHasImage = require('./data/restaurant_has_image');

exports.seed = (knex) => knex.batchInsert('restaurant_has_image', restaurantHasImage);
