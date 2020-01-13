'use strict';
const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');

describe('test/view-rax-ssr.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view-rax-ssr-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, raxssr')
      .expect(200);
  });
  it('should GET /ssr', () => {
    return request(app.callback())
      .get('/ssr')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('"csrf"') > -1);
        assert(res.text.includes('<title>Egg Rax SSR</title>'));
        assert(res.text.includes('<h2>Egg Rax Server Side Render</h2>'));
      });
  });
  it('should GET /csr', () => {
    return request(app.callback())
      .get('/csr')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('"csrf"') > -1);
        assert(res.text.includes('"message":"Egg Rax Client Side Render"'));
      });
  });
  it('should GET /asset', () => {
    return request(app.callback())
      .get('/asset')
      .expect(200)
      .expect(res => {
        assert(res.text.includes('<title>Egg Rax Asset</title>'));
        assert(res.text.includes('/public/js/runtime'));
        assert(res.text.includes('/public/js/chunk/common'));
        assert(res.text.includes('/public/js/chunk/test'));
      });
  });
});
