module.exports = {
  "development": {
    "username": process.env.DB_U || "csye6225u",
    "password": process.env.DB_P || "csye6225",
    "database": process.env.DB_N || "csye6225",
    "host": process.env.DB_H || "127.0.0.1",
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
