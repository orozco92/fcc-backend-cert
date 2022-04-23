const prefix = '/api'
// routes
const mainRouter = require('./main');
const usersRouter = require('./users');

function init(app) {
  app.use(prefix + '/users', usersRouter);
  app.use(prefix, mainRouter);
}

module.exports.init = init;
