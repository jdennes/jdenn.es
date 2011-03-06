(function($){
  $.fn.dailymile = function(options) {
    var defaults = {
      username: "jdennes",
      number: 10
    },
    settings = $.extend({}, defaults, options),
    url = "http://api.dailymile.com/people/" + settings.username + "/entries.json?callback=?",
    displayElement = $(this);
    displayElement.empty();
    $.getJSON(url, function(data) {
      var html = [];
      html.push('<ul>');
      $.each(data.entries, function(i, item) {
        html.push('<li>');
        html.push('<span class="icon"><img width="34" height="34" src="' + item.user.photo_url + '" /></span>');
        var title = 'Running (untitled)';
        if (item.workout.title) { title = item.workout.title; }
        html.push('<span class="details"><a target="_blank" href="' + item.url + '">' + title + '</a><br />');
        var hours = 0, minutes = 0, seconds = 0, duration = '';
        var time = item.workout.duration;
        hours = Math.floor(time / 3600);
        time = time - hours * 3600;
        minutes = Math.floor(time / 60);
        seconds = time - minutes * 60;
        if (hours > 0) { duration += (hours > 9 ? hours : ("0" + hours)) + ':'; } else { duration += "00:"; }
        if (minutes > 0 || hours > 0) { duration += (minutes > 9 ? minutes : ("0" + minutes)) + ':'; } else { duration += "00:"; }
        if (seconds > 0 || minutes > 0 || hours > 0) { duration += (seconds > 9 ? seconds : ("0" + seconds)); }
        var when = new Date(item.at);
        html.push('<span class="more-details">&mdash; Ran ' + item.workout.distance.value.toFixed(2) + " " + item.workout.distance.units + 
          ' in ' + duration + ', on ' + when + '</span>');
        html.push('</span></li>');
        if (i == (settings.number - 1)) { return false; }
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
})(jQuery);