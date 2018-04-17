// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      // host     : '127.0.0.1',
      host     : '104.236.229.19',
      user     : 'root',
      password : '7426',
      database : 'flashcards',
      charset  : 'utf8'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
