module.exports = {
  "development": {
    "username": process.env.DB_U || "csye6225u",
    "password": process.env.DB_P || "csye6225",
    "database": process.env.DB_N || "csye6225",
    "host": process.env.DB_H_W || "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "dialectOptions": {
         "ssl": {
             "require": true,
             "rejectUnauthorized": false
         },
     },
    "pool": {
        "max": 5,
        "min": 0,
        "idle": 300
    }
  },
  "read-replica": {
    "host": process.env.DB_H_R || "127.0.0.1",
    "pool": {
        "max": 5,
        "min": 0,
        "idle": 300
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
