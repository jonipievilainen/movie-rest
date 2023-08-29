require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Varmista yhteyden toimivuus AWS RDS:ään
    }
  }
});

const Movie = sequelize.define('Movie', {
  name: Sequelize.STRING,
  year: Sequelize.INTEGER,
  genres: Sequelize.ARRAY(Sequelize.STRING),
  ageLimit: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  actors: Sequelize.JSONB,
  director: Sequelize.JSONB,
  synopsis: Sequelize.TEXT
});

sequelize.sync(); // Luo tietokantataulut
module.exports = Movie;
