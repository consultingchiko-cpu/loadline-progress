const assert = require('assert');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.navigator = dom.window.navigator;
const Loadline = require('../src/loadline.cjs');

describe('Loadline v0.2', function() {
  beforeEach(function() {
    Loadline.remove();
    Loadline.configure({ speed: 0, trickle: false, showSpinner: true, parent: 'body', template: '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="peg"></div></div><div class="spinner" role="status"><div class="spinner-icon"></div></div>' });
  });

  it('emits lifecycle events', function() {
    const events = [];
    const onStart = () => events.push('start');
    Loadline.on('start', onStart).on('progress', () => events.push('progress')).on('done', () => events.push('done'));
    Loadline.start().set(0.5).done();
    assert.ok(events.includes('start'));
    assert.ok(events.includes('progress'));
    assert.ok(events.includes('done'));
    Loadline.off('start', onStart);
  });

  it('supports fail without leaving stale timers or status', function() {
    let failed = false;
    Loadline.on('fail', () => { failed = true; });
    Loadline.start().fail();
    assert.equal(failed, true);
    assert.equal(Loadline.status, 0.08);
    Loadline.remove();
    assert.equal(Loadline.status, null);
  });

  it('supports native promises and rejection', async function() {
    Loadline.configure({ speed: 0 });
    Loadline.promise(Promise.resolve('ok'));
    await new Promise(resolve => setTimeout(resolve, 5));
    assert.equal(Loadline.status, null);
    Loadline.promise(Promise.reject(new Error('expected')));
    await new Promise(resolve => setTimeout(resolve, 5));
    Loadline.remove();
  });

  it('writes accessible progress attributes', function() {
    Loadline.set(0.42);
    const bar = document.querySelector('[role="progressbar"]');
    assert.equal(bar.getAttribute('aria-valuenow'), '42');
    assert.equal(document.documentElement.classList.contains('loadline-busy'), true);
  });

  it('is safe to call without a DOM', function() {
    const savedDocument = global.document;
    const savedWindow = global.window;
    delete global.document;
    delete global.window;
    delete require.cache[require.resolve('../src/loadline.cjs')];
    const ServerLoadline = require('../src/loadline.cjs');
    ServerLoadline.configure({ trickle: false }).start().set(0.4);
    assert.equal(ServerLoadline.status, 0.4);
    ServerLoadline.remove();
    global.document = savedDocument;
    global.window = savedWindow;
    require('../src/loadline.cjs');
  });
});
