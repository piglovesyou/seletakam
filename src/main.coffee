
now = Date.now or -> (new Date).getTime()

# https://developer.mozilla.org/ja/JavaScript/Reference/Global_Objects/Array/reduce
reduce = Array::reduce or (accumulator) ->
  throw new TypeError("Object is null or undefined")  if this is null or this is `undefined`
  i = 0
  l = @length >> 0
  curr = undefined
  throw new TypeError("First argument is not callable")  if typeof accumulator isnt "function"
  if arguments.length < 2
    throw new TypeError("Array length is 0 and no second argument")  if l is 0
    curr = this[0]
    i = 1
  else
    curr = arguments[1]
  while i < l
    curr = accumulator.call(`undefined`, curr, this[i], i, this)  if i of this
    ++i
  curr

defer = (args...) ->
  times = args.length - 1
  i = 0
  (defer_ = ( ->
    args[i]()
    if ++i < times
      setTimeout(defer_, 0)
    else
      args[args.length - 1]()
  ))()

timediff = ( ->
  t = -1
  d = 0
  return {
    start: ->
      t = now()
    stop : ->
      throw new Error('umm..')  if t is -1
      d = now() - t
      t = -1
      d
  }
)()

main = ( ->
  j = 0
  times = 10
  diff = []
  (_main = -> 
    defer(->
      document.body.style.display = 'none'
      timediff.start()
    , ->
      document.body.style.display = 'block'
    , ->
      diff.push timediff.stop()
      _main()  if ++j < times
    , ->
      if diff.length >= times
        result = Math.round(reduce.call(diff, ((a, b) -> (a + b) / 2)))
        alert  "avarage: #{result} ms"
    )
  )()
)() 

