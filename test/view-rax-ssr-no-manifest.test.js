'use strict';
const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');

describe('test/view-rax-ssr-no-manifest.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view-rax-ssr-no-manifest-test',
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
  it('should GET /render', () => {
    return request(app.callback())
      .get('/render')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('rax server side render for component') > -1);
      });
  });
  it('should GET /renderMarkup', () => {
    return request(app.callback())
      .get('/renderMarkup')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('rax server side render for component!') > -1);
      });
  });
  it('should GET /renderError', () => {
    return request(app.callback())
      .get('/error')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('</body></html>') > -1);
      });
  });
});
