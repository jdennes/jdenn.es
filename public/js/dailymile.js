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
      $.each(data.entries, function(i, item) {

        // TODO: Format dailymile content

      });
    });
  };
})(jQuery);