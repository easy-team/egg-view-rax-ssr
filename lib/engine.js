'use strict';
const fs = require('fs');
const Rax = require('rax');
const serialize = require('serialize-javascript');
const RaxDOMServer = require('rax-server-renderer');
const isValidElement = require('rax-is-valid-element').default;
const Resource = require('server-side-render-resource');
const RAX_RESOURCE = Symbol('Application#resource');

class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.raxssr;
    this.fileCache = [];
  }

  get resource() {
    if (!this[RAX_RESOURCE]) {
      if (fs.existsSync(this.config.manifest)) {
        this[RAX_RESOURCE] = new Resource(this.app, this.config);
      }
    }
    if (process.env && process.env.NODE_ENV === 'production' && !this[RAX_RESOURCE]) {
      this.app.logger.warn('[egg-view-rax-ssr] rax server rendering missing manifest!');
    }
    return this[RAX_RESOURCE];
  }

  getAsset(name, state) {
    const manifest = this.resource && this.resource.manifest || {};
    const deps = manifest.deps || {};
    const res = deps[name] || {};
    return {
      js: res.js || [],
      css: res.css || [],
      state: serialize(state || {}, { isJSON: true }),
    };
  }

  normalizeLocals(locals = {}) {
    [ 'ctx', 'request', 'helper' ].forEach(key => {
      Object.defineProperty(locals, key, { enumerable: false });
    });
    return locals;
  }

  mergeLocals(ctx, locals, options, engine = true) {
    options = options || {};
    locals = engine ? options.locals : locals;
    locals = this.setCSRFLocals(ctx, locals);
    if (this.config.mergeLocals) {
      // if egg-view engine mode, the locals had merged
      return Object.assign({}, { ctx, request: ctx.request, helper: ctx.helper }, ctx.locals, locals);
    }
    return Object.assign({}, { ctx, request: ctx.request, helper: ctx.helper }, locals);
  }

  setCSRFLocals(ctx, locals) {
    // when csrf enable, set ctx csrf
    const security = this.app.config.security;
    if (security.csrf && security.csrf.enable) {
      return Object.assign({}, { csrf: ctx.csrf }, locals);
    }
    return locals;
  }

  normalizeraxElement(raxElement) {
    return raxElement && raxElement.default ? raxElement.default : raxElement;
  }

  render(name, locals, options) {
    const raxElement = require(name);
    return this.renderElement(raxElement, locals, options);
  }

  readFile(filepath) {
    if (this.fileCache[filepath]) {
      return Promise.resolve(this.fileCache[filepath]);
    }
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          this.fileCache[filepath] = data;
          resolve(data);
        }
      });
    });
  }

  renderPage(name, locals, options) {
    // 支持自定义 layout html 模板
    const result = /\.(html|htm|tpl)$/.test(name) ? this.readFile(name) : this.render(name, locals, options);
    return result.then(html => {
      if (this.app.rax.resource) {
        locals = this.normalizeLocals(locals);
        return this.app.rax.resource.inject(html, options.name, locals, options);
      }
      return html;
    });
  }

  renderElement(raxElement, locals, options) {
    raxElement = this.normalizeraxElement(raxElement);
    if (isValidElement(raxElement) || (raxElement.prototype && raxElement.prototype.israxComponent)) {
      return Promise.resolve(this.renderToString(raxElement, locals));
    }
    // support rax redux isomorphism, this raxElement is custom promise callback function
    // cannot valid statelss component or custom promise callback function, hook temporary support stateless render, will next major fix
    const context = { state: locals };
    const result = raxElement(context, options);
    if (result && result.then) {
      return result.then(element => {
        return this.renderToString(element, locals);
      });
    }
    return Promise.resolve(this.renderToString(raxElement, locals));
  }

  renderAsset(ctx, name, locals, options = {}) {
    const layout = options.layout || this.config.layout;
    const viewEngine = options.viewEngine || this.config.viewEngine || 'nunjucks';
    // 输出到页面的 state 数据
    const state = Object.assign({}, ctx.locals, locals);
    const asset = this.getAsset(name, state);
    // egg-view 自动合并 ctx, request, response, helper
    return this.readFile(layout).then(template => {
      const context = Object.assign({}, locals, { asset });
      return ctx.renderString(template, context, { viewEngine });
    });
  }

  renderMarkup(name, locals) {
    const raxElement = require(name);
    return Promise.resolve(this.renderToStaticMarkup(raxElement, locals));
  }

  renderToString(raxElement, locals) {
    raxElement = this.normalizeraxElement(raxElement);
    const element = Rax.createElement(raxElement, locals);
    return RaxDOMServer.renderToString(element);
  }

  renderToStaticMarkup(raxElement, locals) {
    raxElement = this.normalizeraxElement(raxElement);
    const element = Rax.createElement(raxElement, locals);
    return RaxDOMServer.renderToStaticMarkup(element);
  }
}

module.exports = Engine;
