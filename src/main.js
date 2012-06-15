(function() {
  var defer, main, timediff,
    __slice = Array.prototype.slice;

  Date.now = Date.now || function() {
    return (new Date).getTime();
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
        return t = Date.now();
      },
      stop: function() {
        if (t === -1) throw new Error('umm..');
        d = Date.now() - t;
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
          result = Math.round(diff.reduce(function(a, b) {
            return (a + b) / 2;
          }));
          return alert("avarage: " + result + " ms");
        }
      });
    })();
  })();

}).call(this);
