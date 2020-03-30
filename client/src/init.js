window.BUS = (function() {
  var events = {}
  return {
    $on(name, fn) {
      events[name] = fn
    },
    $emit() {
      if (events[arguments[0]]) {
        var options = Array.prototype.slice.call(arguments, 1)
        events[arguments[0]].apply(null, options)
      }
    }
  }
})()
