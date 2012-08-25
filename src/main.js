(function() {
  var avarage, defer, main, now, timediff,
    __slice = Array.prototype.slice;

  now = Date.now || function() {
    return (new Date).getTime;
  };

  avarage = function(arr) {
    var sum, time, _i, _len;
    sum = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      time = arr[_i];
      sum += time;
    }
    return sum / arr.length;
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
        return document.body.style.display = 'none';
      }, function() {
        document.body.style.display = 'block';
        return timediff.start();
      }, function() {
        diff.push(timediff.stop());
        if (++j < times) return _main();
      }, function() {
        var result;
        if (diff.length >= times) {
          result = Math.round(avarage(diff));
          return alert("avarage: " + result + " ms");
        }
      });
    })();
  })();

}).call(this);
