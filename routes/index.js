const prefix = '/api'
// routes
const mainRouter = require('./main');
const usersRouter = require('./users');

function init(app) {
  app.use(prefix, mainRouter);
  app.use(prefix + '/users', usersRouter);
}

module.exports.init = init;
