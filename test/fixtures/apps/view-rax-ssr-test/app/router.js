'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.raxssr.name;
  });
  app.get('/ssr', app.controller.test.ssr);
  app.get('/csr', app.controller.test.csr);
  app.get('/asset', app.controller.test.asset);
};
