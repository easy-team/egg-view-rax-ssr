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
  it('should GET /render', () => {
    return request(app.callback())
      .get('/render')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('"csrf"') > -1);
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
  it('should GET /renderClient', () => {
    return request(app.callback())
      .get('/renderClient')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('"csrf"') > -1);
        assert(res.text.indexOf('"egg renderClient"') > -1);
        assert(res.text.indexOf('rax client render') > -1);
      });
  });
  it('should GET /renderraxClient', () => {
    return request(app.callback())
      .get('/renderraxClient')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('"csrf"') > -1);
        assert(res.text.indexOf('"egg renderClient"') > -1);
        assert(res.text.indexOf('rax client render') > -1);
      });
  });
  it('should GET /renderAsset', () => {
    return request(app.callback())
      .get('/renderAsset')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('<title>renderAsset</title>') > -1);
        assert(res.text.indexOf('src="/public/js/common.52446b6b.js"') > -1);
        assert(res.text.indexOf('window.__INITIAL_STATE__ = {"title":"renderAsset","message":"rax renderAsset test"}') > -1);
      });
  });
  it('should GET /renderraxAsset', () => {
    return request(app.callback())
      .get('/renderraxAsset')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('<title>renderAsset</title>') > -1);
        assert(res.text.indexOf('src="/public/js/common.52446b6b.js"') > -1);
        assert(res.text.indexOf('window.__INITIAL_STATE__ = {"title":"renderAsset","message":"rax renderAsset test"}') > -1);
      });
  });
  it('should GET /renderForStateless', () => {
    return request(app.callback())
      .get('/stateless')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('Egg + rax + Webpack Server Side Render Stateless Component') > -1);
      });
  });
  it('should GET /renderForPromiseMode', () => {
    return request(app.callback())
      .get('/promise')
      .expect(200)
      .expect(res => {
        assert(res.text.indexOf('Egg + rax + Webpack Server Side Render Promise Mode') > -1);
      });
  });
});
