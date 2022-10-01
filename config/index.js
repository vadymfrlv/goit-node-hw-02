// const ENV = process.env.NODE_ENV || 'dev';
// require('dotenv').config({ path: `.env.${ENV}` });
require('dotenv').config();

const { PORT, MONGO_URI, SECRET_KEY } = process.env;

module.exports = {
  port: Number(PORT) || 3000,
  mongoURI: MONGO_URI,
  jwtSecret: SECRET_KEY,
};
