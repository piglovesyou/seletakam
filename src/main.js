(function() {
  var defer, main, now, reduce, timediff,
    __slice = Array.prototype.slice;

  now = Date.now || function() {
    return (new Date).getTime();
  };

  reduce = Array.prototype.reduce || function(accumulator) {
    var curr, i, l;
    if (this === null || this === undefined) {
      throw new TypeError("Object is null or undefined");
    }
    i = 0;
    l = this.length >> 0;
    curr = void 0;
    if (typeof accumulator !== "function") {
      throw new TypeError("First argument is not callable");
    }
    if (arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1;
    } else {
      curr = arguments[1];
    }
    while (i < l) {
      if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }
    return curr;
  };

  defer = function() {
    var args, defer_, i, times;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    times = args.length - 1;
    i = 0;
    return (defer_ = (function() {
      args[i]();
      if (++i < times) {
        return setTimeout(defer_, 0);
      } else {
        return args[args.length - 1]();
      }
    }))();
  };

  timediff = (function() {
    var d, t;
    t = -1;
    d = 0;
    return {
      start: function() {
        return t = now();
      },
      stop: function() {
        if (t === -1) throw new Error('umm..');
        d = now() - t;
        t = -1;
        return d;
      }
    };
  })();

  main = (function() {
    var diff, j, times, _main;
    j = 0;
    times = 10;
    diff = [];
    return (_main = function() {
      return defer(function() {
        document.body.style.display = 'none';
        return timediff.start();
      }, function() {
        return document.body.style.display = 'block';
      }, function() {
        diff.push(timediff.stop());
        if (++j < times) return _main();
      }, function() {
        var result;
        if (diff.length >= times) {
          result = Math.round(reduce.call(diff, (function(a, b) {
            return (a + b) / 2;
          })));
          return alert("avarage: " + result + " ms");
        }
      });
    })();
  })();

}).call(this);
