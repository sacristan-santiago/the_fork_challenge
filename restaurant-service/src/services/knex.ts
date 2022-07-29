import knex from 'knex'

const client = knex({
    client: 'pg',
    connection: {
      host : '172.18.0.3',
      port : 5432,
      user : 'postgres',
      password : 'postgres',
      database : 'thefork'
    }
  });


export default client