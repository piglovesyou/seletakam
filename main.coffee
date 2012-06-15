
Date.now = Date.now or -> (new Date).getTime()

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
      t = Date.now()
    stop : ->
      throw new Error('umm..')  if t is -1
      d = Date.now() - t
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
        result = Math.round(diff.reduce((a, b) -> (a + b) / 2))
        alert  "avarage: #{result} ms"
    )
  )()
)() 

