'use strict';
module.exports = {
  renderClient(name, locals, options) {
    return this.renderraxClient(name, locals, options);
  },

  renderAsset(name, locals, options) {
    return this.renderraxAsset(name, locals, options);
  },

  renderraxAsset(name, locals, options) {
    return this.app.rax.renderAsset(this, name, locals, options).then(html => {
      this.body = html;
    });
  },

  renderraxClient(name, locals = {}, options = {}) {
    const config = this.app.config.raxssr;
    const layout = options.layout || config.layout;
    locals = this.app.rax.mergeLocals(this, locals, options, false);
    options = Object.assign({}, options, { name, markup: true });
    return this.app.rax.renderPage(layout, locals, options).then(html => {
      this.body = html;
    });
  },
};
