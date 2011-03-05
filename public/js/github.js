(function($){
  $.fn.github = function(options) {
    var defaults = {
      count: 10
    },
    settings = $.extend({}, defaults, options),
    url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=a6bc41631b551cf342113be8c733a329&_render=json&limit=' + settings.count + '&_callback=?',
    displayElement = $(this),
    grav = "https://secure.gravatar.com/avatar/55fd031da91ef9af6e6ed88b101416a1?s=34&d=https://github.com/images/gravatars/gravatar-140.png";
    displayElement.empty();
    $.getJSON(url, function(data) {
      var html = [];
      html.push('<ul>');
      $.each(data.value.items, function(i, item) {
        html.push('<li>');
        html.push('<div class="grav"><img src="' + grav + '" width="34" height="34" /></div>');
        // Add 8 hours to utime, as it's not in GMT
        html.push('<a target="_blank" href="' + item.link + '">' + prettyDate(parseInt(item["y:published"].utime) + 28800) + ' ' + 
          item.title + '</a><div class="item-details">' +item.content.content + '</div>');
        html.push('</li>');
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
})(jQuery);