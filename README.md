# egg-view-rax-ssr

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-view-rax-ssr.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-view-rax-ssr
[travis-image]: https://img.shields.io/travis/easy-team/egg-view-rax-ssr.svg?style=flat-square
[travis-url]: https://travis-ci.org/easy-team/egg-view-rax-ssr
[codecov-image]: https://img.shields.io/codecov/c/github/easy-team/egg-view-rax-ssr.svg?style=flat-square
[codecov-url]: https://codecov.io/github/easy-team/egg-view-rax-ssr?branch=master
[david-image]: https://img.shields.io/david/easy-team/egg-view-rax-ssr.svg?style=flat-square
[david-url]: https://david-dm.org/easy-team/egg-view-rax-ssr
[snyk-image]: https://snyk.io/test/npm/egg-view-rax-ssr/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-view-rax-ssr
[download-image]: https://img.shields.io/npm/dm/egg-view-rax-ssr.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-view-rax-ssr

Rax Server Side Render Plugin for Egg

## Install

```bash
$ npm i  egg-view-rax-ssr --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.raxssr = {
  enable: true,
  package: 'egg-view-rax-ssr',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.raxssr = {
  // doctype: '<!doctype html>',
  // layout: path.join(app.baseDir, 'app/view/layout.html'),
  // manifest: path.join(app.baseDir, 'config/manifest.json'),
  // injectHeadRegex: /(<\/head>)/i,
  // injectBodyRegex: /(<\/body>)/i,
  // injectCss: true,
  // injectJs: true,
  // crossorigin: false,
  // injectRes: [],
  // mergeLocals: true,
  // fallbackToClient: true, // fallback to client rendering if server render failed
  // afterRender: (html, context) => { /* eslint no-unused-vars:off */
  //   return html;
  // },
};
```

see [config/config.default.js](config/config.default.js) for more detail.


## Render

### Server Render, Call `render`

> when server render bundle error, will try client render**

> https://www.yuque.com/easy-team/egg-react/node

```js
// controller/home.js
exports.index = function* (ctx) {
  yield ctx.render('index/index.js', { message: 'egg rax server side render'});
};
```

### Client Render, Call `renderClient`, Use Rax render layout

> https://www.yuque.com/easy-team/egg-react/web

> when client render, render layout `exports.raxssr.layout` by Rax

```js
// controller/home.js
exports.client = function* (ctx) {
  yield ctx.renderClient('index/index.js',{ message: 'egg rax client render'});
};
```

### Asset Render, Call `renderAsset`, Use render layout by viewEngine, default `nunjucks`

> https://www.yuque.com/easy-team/egg-react/asset

- when asset render, you can render layout `exports.raxssr.layout` by viewEngine, default use `egg-view-nunjucks`
- you must install the specified engine dependence, such as `egg-view-nunjucks` or `egg-view-ejs`
- The context provides an `asset` object that can get `js`, `css`, `state` information. [layout template](https://www.yuque.com/easy-team/egg-react/asset)

#### use default viewEngine nunjucks

```js
// controller/home.js
exports.asset = function* (ctx) {
  yield ctx.renderAsset('index/index.js', { message: 'egg rax asset render'});
};
```

#### scope render viewEngine config

```js
// controller/home.js
exports.asset = function* (ctx) {
  yield ctx.renderAsset('index/index.js', { message: 'egg rax asset render'}, { viewEngine: 'ejs' });
};
```

## Example

Rax server side render example, please see [egg-react-webpack-boilerplate](https://github.com/easy-team/egg-react-webpack-boilerplate/tree/rax)

## Questions & Suggestions

Please open an issue [here](https://github.com/easy-team/egg-react-webpack-boilerplate/issues).

## License

[MIT](LICENSE)
