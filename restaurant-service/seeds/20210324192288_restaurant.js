const restaurant = require('./data/restaurant');

exports.seed = (knex) => knex.batchInsert('restaurant', restaurant);
