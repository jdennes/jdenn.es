$ ->
  url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D638242&format=json&callback=weather_callback'
  $.ajax
    url: url,
    dataType: 'jsonp'

this.get_icon = (code) ->
  # Mapped from: http://developer.yahoo.com/weather/#codes
  return '&#xe01a;' if code in [0,1,2,3,4,37,38,39,45,47] # lightning/thunder
  return '&#xe011;' if code in [5,6,7,8,9,10,11,12,18,40] # sleet/drizzle/rain
  return '&#xe016;' if code in [13,14,15,16,41,42,43,46]  # snow
  return '&#xe017;' if code in [17,35]                    # hail
  return '&#xe009;' if code in [19..22]                   # haze/dust
  return '&#xe005;' if code in [23,24]                    # windy
  return '&#xe018;' if code in [25,26,44]                 # cloudy
  return '&#xe008;' if code in [27,29]                    # partly cloudy - night
  return '&#xe007;' if code in [28,30]                    # partly cloudy - day
  return '&#xe002;' if code in [31,33]                    # clear - night
  return '&#xe000;' if code in [32,34,36]                 # sunny
  ''

this.weather_callback = (data) ->
  if data.query.results.channel.item.condition.text? and data.query.results.channel.item.condition.code?
    text = data.query.results.channel.item.condition.text
    code = data.query.results.channel.item.condition.code
    icon = get_icon parseInt(code, 10)
    if icon isnt ''
      $('span.weather-icon').html(icon).attr("title", "#{text} in Berlin right now.").show()
