const prefix = '/api'
// routes
const fileRouter = require('./file-upload');
const mainRouter = require('./main');
const usersRouter = require('./users');

function init(app) {
  app.use(fileRouter);
  app.use(prefix, mainRouter);
  app.use(prefix + '/users', usersRouter);

}

module.exports.init = init;
