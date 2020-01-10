'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.raxssr.name;
  });
  app.get('/render', app.controller.view.render);
  app.get('/renderClient', app.controller.view.renderClient);
  app.get('/renderraxClient', app.controller.view.renderraxClient);
  app.get('/renderAsset', app.controller.view.renderAsset);
  app.get('/renderraxAsset', app.controller.view.renderraxAsset);
  app.get('/error', app.controller.view.renderError);
  app.get('/renderMarkup', app.controller.view.renderMarkup);
};
