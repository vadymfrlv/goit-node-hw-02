const app = require('./app');
require('./config');
const { connect } = require('mongoose');
const { mongoURI, port } = require('./config');

connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log('Database connection successful');
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });
