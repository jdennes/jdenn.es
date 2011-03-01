(function($){
  $.fn.flickr = function(options) {
    var defaults = {
      api_key: "ab1352e7326fe6d5d9b1130cc0441b9b",
      id: '99761031@N00',
      number: 50
    },
    settings = $.extend({}, defaults, options),
    url = "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&format=json&page=1" +
      "&extras=url_sq,path_alias&jsoncallback=?" +
      "&per_page=" + encodeURIComponent(settings.number) + "&user_id=" + encodeURIComponent(settings.id) +
      "&api_key=" + encodeURIComponent(settings.api_key),
    displayElement = $(this);

    displayElement.empty();
    $.getJSON(url, function(data) {
      $.each(data.photos.photo, function(i, item) {
        item.link = "http://flickr.com/photos/" + item.pathalias + "/" + item.id;
        $('<img/>').attr({ src: item.url_sq, alt: item.title }).appendTo(displayElement)
          .wrap("<a href=\"" + item.link + "\" title=\"" +item.title  + "\" target=\"_blank\"></a>");
      });
    });
  };
})(jQuery);