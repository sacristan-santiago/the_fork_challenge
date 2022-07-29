const country = require('./data/country');

exports.seed = (knex) => knex.batchInsert('country', country);
