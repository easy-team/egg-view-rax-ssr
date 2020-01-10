'use strict';

const Engine = require('../../lib/engine');
const RAX_ENGINE = Symbol('Application#rax');

module.exports = {

  get rax() {
    if (!this[RAX_ENGINE]) {
      this[RAX_ENGINE] = new Engine(this);
    }
    return this[RAX_ENGINE];
  },
};
