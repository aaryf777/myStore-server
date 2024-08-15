const { port, env } = require("./constants/vars");
const app = require("./config/app");
const db = require("./config/db");
// const { producer } = require('./api/services/producer'); // eslint-disable-line

// open mongoose connection
db.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
