'use strict';
const path = require('path');
exports.render = function* (ctx) {
  yield ctx.render('component.js', {
    title: '--rax server side render--',
    keywords: 'rax server side render',
    message: {
      text: 'rax server side render for component!',
    },
  });
};

exports.renderClient = function* (ctx) {
  ctx.locals = {
    title: 'egg renderClient',
  };
  yield ctx.renderClient('component.js', {
    msg: 'rax client render',
  });
};
exports.renderraxClient = function* (ctx) {
  ctx.locals = {
    title: 'egg renderClient',
  };
  yield ctx.renderraxClient('component.js', {
    msg: 'rax client render',
  });
};
exports.renderAsset = function* (ctx) {
  yield ctx.renderAsset('component.js', {
    title: 'renderAsset',
    message: 'rax renderAsset test',
  }, { layout: path.join(ctx.app.baseDir, 'app/view/layout_asset.html'),
  });
};

exports.renderraxAsset = function* (ctx) {
  yield ctx.renderraxAsset('component.js', {
    title: 'renderAsset',
    message: 'rax renderAsset test',
  }, { layout: path.join(ctx.app.baseDir, 'app/view/layout_asset.html'),
  });
};

exports.renderError = function* (ctx) {
  yield ctx.render('error.js', {
    msg: 'rax client render',
  });
};

exports.renderMarkup = function* (ctx) {
  const filepath = path.resolve(__dirname, '../view/component.js');
  this.body = yield ctx.app.rax.renderMarkup(filepath, {
    title: '--rax server side render--',
    keywords: 'rax server side render',
    message: {
      text: 'rax server side render for component!',
    },
  });
};

exports.raxServerRenderStateless = function* (ctx) {
  yield ctx.render('stateless.js', {
    title: 'rax Server Render',
    text: 'Egg + rax + Webpack Server Side Render Stateless Component',
  });
};

exports.raxServerRenderPromise = function* (ctx) {
  yield ctx.render('promise.js', {
    title: 'rax Server Render',
    message: 'Egg + rax + Webpack Server Side Render Promise Mode',
  });
};
