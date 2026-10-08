/* Loadline, derived in part from MIT-licensed NProgress source
 * Original copyright: Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * Loadline additions are independently authored. @license MIT */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) define(factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Loadline = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  var Loadline = {};
  Loadline.version = '0.2.0';
  var Settings = Loadline.settings = {
    minimum: 0.08, easing: 'linear', positionUsing: '', speed: 200,
    trickle: true, trickleSpeed: 200, showSpinner: true,
    barSelector: '[role="progressbar"]', spinnerSelector: '[role="status"]', parent: 'body',
    template: '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="peg"></div></div><div class="spinner" role="status" aria-label="Loading" aria-live="polite"><div class="spinner-icon"></div></div>'
  };
  var timers = [], listeners = {}, queue = [], running = false;
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function hasDOM() { return !!doc() && !!doc().createElement; }
  function reduced() { return hasDOM() && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function duration() { return reduced() ? 0 : Math.max(0, Settings.speed); }
  function later(fn, ms) { var id = setTimeout(function() { timers = timers.filter(function(x) { return x !== id; }); fn(); }, ms); timers.push(id); return id; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function emit(name, payload) { (listeners[name] || []).slice().forEach(function(fn) { fn(payload); }); }
  Loadline.on = function(name, fn) { if (typeof fn !== 'function') return this; (listeners[name] || (listeners[name] = [])).push(fn); return this; };
  Loadline.off = function(name, fn) { if (!listeners[name]) return this; listeners[name] = fn ? listeners[name].filter(function(x) { return x !== fn; }) : []; return this; };
  Loadline.configure = function(options) { options = options || {}; Object.keys(options).forEach(function(key) { if (options[key] !== undefined) Settings[key] = options[key]; }); return this; };
  Loadline.status = null;
  Loadline.isStarted = function() { return typeof Loadline.status === 'number'; };
  Loadline.set = function(value) {
    var started = Loadline.isStarted(), n = clamp(Number(value) || 0, Settings.minimum, 1);
    Loadline.status = n === 1 ? null : n; emit(n === 1 ? 'done' : (started ? 'progress' : 'start'), n);
    if (!hasDOM()) return this;
    var progress = Loadline.render(!started), bar = progress && progress.querySelector(Settings.barSelector), speed = duration();
    if (!bar) return this;
    bar.setAttribute('aria-valuenow', String(Math.round(n * 100))); reflow(progress);
    enqueue(function(next) {
      if (Settings.positionUsing === '') Settings.positionUsing = Loadline.getPositioningCSS();
      css(bar, barPositionCSS(n, speed, Settings.easing));
      if (n === 1) {
        css(progress, { transition: 'none', opacity: 1 }); reflow(progress);
        later(function() { css(progress, { transition: 'opacity ' + speed + 'ms linear', opacity: 0 }); later(function() { Loadline.remove(); next(); }, speed); }, speed);
      } else later(next, speed);
    });
    return this;
  };
  Loadline.start = function() {
    if (!Loadline.status) Loadline.set(0);
    if (running) return this;
    running = true; emit('start', Loadline.status);
    function work() { if (!running || !Loadline.status) return; Loadline.trickle(); later(work, Settings.trickleSpeed); }
    if (Settings.trickle) later(work, Settings.trickleSpeed); return this;
  };
  Loadline.done = function(force) { if (!force && !Loadline.status) return this; running = false; return Loadline.inc(0.3 + 0.5 * Math.random()).set(1); };
  Loadline.fail = function(force) {
    if (!force && !Loadline.status) return this;
    running = false; emit('fail', Loadline.status);
    if (hasDOM() && Loadline.isRendered()) { var bar = Loadline.render().querySelector(Settings.barSelector); if (bar) bar.classList.add('loadline-error'); }
    return this;
  };
  Loadline.inc = function(amount) {
    var n = Loadline.status;
    if (!n) return Loadline.start();
    if (n > 1) return this;
    if (typeof amount !== 'number') amount = n < 0.2 ? 0.1 : n < 0.5 ? 0.04 : n < 0.8 ? 0.02 : n < 0.99 ? 0.005 : 0;
    return Loadline.set(clamp(n + amount, 0, 0.994));
  };
  Loadline.trickle = function() { return Loadline.inc(); };
  Loadline.promise = function(promise) {
    if (!promise || (typeof promise.state === 'function' && promise.state() === 'resolved')) return this;
    Loadline.start();
    var done = function() { Loadline.done(); }, fail = function() { Loadline.fail(); };
    if (typeof promise.then === 'function') promise.then(done, fail); else if (typeof promise.always === 'function') promise.always(done);
    return this;
  };
  Loadline.render = function(fromStart) {
    if (!hasDOM()) return null;
    if (Loadline.isRendered()) return doc().getElementById('loadline');
    doc().documentElement.classList.add('loadline-busy');
    var progress = doc().createElement('div'); progress.id = 'loadline'; progress.innerHTML = Settings.template;
    var bar = progress.querySelector(Settings.barSelector); if (!bar) return progress;
    var parent = isDOM(Settings.parent) ? Settings.parent : doc().querySelector(Settings.parent); if (!parent) parent = doc().body;
    css(bar, { transition: 'all 0ms linear', transform: 'translate3d(' + (fromStart ? '-100' : toBarPerc(Loadline.status || 0)) + '%,0,0)' });
    if (!Settings.showSpinner) { var spinner = progress.querySelector(Settings.spinnerSelector); if (spinner) removeElement(spinner); }
    if (parent !== doc().body) parent.classList.add('loadline-custom-parent'); parent.appendChild(progress); return progress;
  };
  Loadline.remove = function() {
    running = false; clearTimers(); Loadline.status = null;
    if (!hasDOM()) return;
    doc().documentElement.classList.remove('loadline-busy');
    var parent = isDOM(Settings.parent) ? Settings.parent : doc().querySelector(Settings.parent); if (parent) parent.classList.remove('loadline-custom-parent');
    var progress = doc().getElementById('loadline'); if (progress) removeElement(progress); emit('remove');
  };
  Loadline.isRendered = function() { return hasDOM() && !!doc().getElementById('loadline'); };
  Loadline.getPositioningCSS = function() {
    if (!hasDOM() || !doc().body) return 'translate3d';
    var style = doc().body.style, prefix = ('WebkitTransform' in style) ? 'Webkit' : ('MozTransform' in style) ? 'Moz' : ('msTransform' in style) ? 'ms' : ('OTransform' in style) ? 'O' : '';
    return prefix + 'Perspective' in style ? 'translate3d' : (prefix + 'Transform' in style ? 'translate' : 'margin');
  };
  function enqueue(fn) { queue.push(fn); if (queue.length === 1) nextQueue(); }
  function nextQueue() { var fn = queue.shift(); if (fn) fn(nextQueue); }
  function reflow(el) { return el && el.offsetWidth; }
  function clamp(n, min, max) { return n < min ? min : n > max ? max : n; }
  function toBarPerc(n) { return (-1 + n) * 100; }
  function barPositionCSS(n, speed, ease) { var p = Settings.positionUsing, out = p === 'translate3d' ? { transform: 'translate3d(' + toBarPerc(n) + '%,0,0)' } : p === 'translate' ? { transform: 'translate(' + toBarPerc(n) + '%,0)' } : { marginLeft: toBarPerc(n) + '%' }; out.transition = 'all ' + speed + 'ms ' + ease; return out; }
  function isDOM(obj) { return obj && typeof obj === 'object' && obj.nodeType === 1; }
  function css(el, props) { Object.keys(props).forEach(function(k) { el.style[k] = props[k]; }); }
  function removeElement(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }
  return Loadline;
});
