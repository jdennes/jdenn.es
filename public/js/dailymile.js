(function($){
  $.fn.dailymile = function(options) {
    var defaults = {
      username: "jdennes"
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
        var title = 'Untitled Run';
        if (item.workout.title) { title = item.workout.title; }
        html.push('<span class="details"><a target="_blank" href="' + item.url + '">' + title + '</a>');
        
        // TODO: Add the rest of the dailymile data
        
        html.push('</span></li>');
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
})(jQuery);