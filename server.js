const app = require('./app');
const { connect } = require('mongoose');
const { mongoURI, port } = require('./config');

connect(mongoURI, {
  useNewUrlParser: true,
})
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
