(function($){
  $.fn.github = function(options) {
    var defaults = {
      count: 10
    },
    settings = $.extend({}, defaults, options),
    url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=a6bc41631b551cf342113be8c733a329&_render=json&limit=' + settings.count + '&_callback=?',
    displayElement = $(this);
    displayElement.empty();
    $.getJSON(url, function(data) {
      var html = [];
      html.push('<ul>');
      $.each(data.value.items, function(i, item) {
        html.push('<li>');
        // Add 8 hours to utime, as it's not in GMT
        html.push('<a href="' + item.link + '">' + prettyDate(parseInt(item["y:published"].utime) + 28800) + ' ' + 
          item.title + '</a><div class="item-details">' +item.content.content + '</div>');
        html.push('</li>');
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
})(jQuery);