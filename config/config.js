module.exports = {
  "development": {
    "username": process.env.DB_U,
    "password": process.env.DB_P,
    "database": process.env.DB_N,
    "host": process.env.DB_H,
    "dialect": "postgres",
    "pool": {
        "max": 5,
        "min": 0,
        "idle": 10000
    }
  },
  "production": {
    "username": process.env.DB_U,
    "password": process.env.DB_P,
    "database": process.env.DB_N,
    "host": process.env.DB_H,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_U,
    "password": process.env.DB_P,
    "database": process.env.DB_N,
    "host": process.env.DB_H,
    "dialect": "postgres",
    "pool": {
        "max": 5,
        "min": 0,
        "idle": 10000
    }
  }
}
