const ENV = process.env.NODE_ENV || 'dev';
require('dotenv').config({ path: `.env.${ENV}` });

const { MONGO_URI, PORT } = process.env;

module.exports = {
  port: Number(PORT) || 3000,
  mongoURI: MONGO_URI,
};
