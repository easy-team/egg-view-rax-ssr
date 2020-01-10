'use strict';
class View {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
  }

  render(name, locals, options = {}) {
    locals = this.app.rax.mergeLocals(this.ctx, locals, options);
    try {
      return this.app.rax.renderPage(name, locals, options);
    } catch (err) {
      const config = this.app.config.raxssr;
      if (config.fallbackToClient) {
        const layout = options.layout || config.layout;
        this.app.logger.error('[%s] server render bundle error, try client render, the server render error', name, err);
        options = Object.assign({}, options, { markup: true });
        return this.app.rax.renderPage(layout, locals, options);
      }
      /* istanbul ignore next */
      throw err;
    }
  }

  /* eslint no-unused-vars:off */
  /* istanbul ignore next */
  renderString(tpl, locals) {
    return Promise.reject('not implemented yet!');
  }
}

module.exports = View;
