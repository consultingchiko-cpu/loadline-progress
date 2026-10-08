(function() {
  if (typeof process === 'object') {
    var JSDOM = require('jsdom').JSDOM;
    var dom = new JSDOM('<!doctype html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.navigator = dom.window.navigator;
  }

  var root = typeof globalThis !== 'undefined' ? globalThis : this;
  var assert = (root.chai || require('chai')).assert;

  describe('Loadline', function() {
    var $, Loadline;

    beforeEach(function() {
      $ = root.jQuery || require('jquery');
      Loadline = root.Loadline || require('../src/loadline.cjs');

      this.settings = $.extend({}, Loadline.settings);
    });

    afterEach(function() {
      $("#loadline").remove();
      $('html').attr('class', '');
      Loadline.status = null;

      // Restore settings
      $.extend(Loadline.settings, this.settings);
    });

    describe('.set()', function() {
      it('.set(0) must render', function(done) {
        Loadline.set(0);
        assert.equal($("#loadline").length, 1);
        assert.equal($("#loadline .bar").length, 1);
        assert.equal($("#loadline .peg").length, 1);
        assert.equal($("#loadline .spinner").length, 1);
        done();
      });

      it('.set(1) should appear and disappear', function(done) {
        Loadline.configure({ speed: 10 });
        Loadline.set(0).set(1);
        assert.equal($("#loadline").length, 1);

        setTimeout(function() {
          assert.equal($("#loadline").length, 0);
          done();
        }, 70);
      });

      it('must respect minimum', function() {
        Loadline.set(0);
        assert.equal(Loadline.status, Loadline.settings.minimum);
      });

      it('must clamp to minimum', function() {
        Loadline.set(-100);
        assert.equal(Loadline.status, Loadline.settings.minimum);
      });

      it('must clamp to maximum', function() {
        Loadline.set(456);
        assert.equal(Loadline.status, null);
      });
    });

    // ----

    describe('.start()', function() {
      it('must render', function(done) {
        Loadline.start();
        assert.equal($("#loadline").length, 1);
        done();
      });

      it('must respect minimum', function() {
        Loadline.start();
        assert.equal(Loadline.status, Loadline.settings.minimum);
      });

      it('must be attached to specified parent', function() {
        var test = $('<div>', {id: 'test'}).appendTo('body');
        Loadline.configure({parent: '#test'});
        Loadline.start();
        assert.isTrue($("#loadline").parent().is(test));
        assert.isTrue($(Loadline.settings.parent).hasClass("loadline-custom-parent"));
      });
    });

    // ----

    describe('.done()', function() {
      it('must not render without start', function(done) {
        Loadline.done();
        assert.equal($("#loadline").length, 0);
        done();
      });

      it('.done(true) must render', function(done) {
        Loadline.done(true);
        assert.equal($("#loadline").length, 1);
        done();
      });
    });

    // ----

    describe('.remove()', function() {
      it('should be removed from the parent', function() {
        Loadline.set(1);
        Loadline.remove();

        var parent = $(Loadline.settings.parent);
        assert.isFalse(parent.hasClass('loadline-custom-parent'));
        assert.equal(parent.find('#loadline').length, 0);
      });
    });

    // ----

    describe('.inc()', function() {
      it('should render', function() {
        Loadline.inc();
        assert.equal($("#loadline").length, 1);
      });

      it('should start with minimum', function() {
        Loadline.inc();
        assert.equal(Loadline.status, Loadline.settings.minimum);
      });

      it('should increment', function() {
        Loadline.start();
        var start = Loadline.status;

        Loadline.inc();
        assert.operator(Loadline.status, '>', start);
      });

      it('should never reach 1.0', function() {
        for (var i=0; i<100; ++i) { Loadline.inc(); }
        assert.operator(Loadline.status, '<', 1.0);
      });
    });

    // -----

    describe('.configure()', function() {
      it('should work', function() {
        Loadline.configure({ minimum: 0.5 });
        assert.equal(Loadline.settings.minimum, 0.5);
      });
    });

    // ----

    describe('.configure(showSpinner)', function() {
      it('should render spinner by default', function() {
        Loadline.start();

        assert.equal($("#loadline .spinner").length, 1);
      });

      it('should be true by default', function() {
        assert.equal(Loadline.settings.showSpinner, true);
      });

      it('should hide (on false)', function() {
        Loadline.configure({ showSpinner: false });
        Loadline.start();

        assert.equal($("#loadline .spinner").length, 0);
      });
    });
  });

})();
