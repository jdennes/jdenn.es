$ ->
  url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D638242&format=json&callback=weather_callback'
  $.ajax
    url: url,
    dataType: 'jsonp'

this.get_icon = (code) ->
  # TODO: Decide which icon to display based on code.
  '&#xe016;'

this.weather_callback = (data) ->
  if data.query.results.channel.item.condition?
    text = data.query.results.channel.item.condition.text
    icon = get_icon data.query.results.channel.item.condition.code
    $('span.weather-icon').html(icon).attr("title", "#{text} in Berlin right now.").show()
