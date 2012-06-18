
now = Date.now or -> (new Date).getTime()

avarage = (arr) ->
  sum = 0
  sum += time  for time in arr
  sum / arr.length

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
        result = Math.round(avarage(diff))
        alert "avarage: #{result} ms"
    )
  )()
)() 

