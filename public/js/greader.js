(function($){
  $.fn.greader = function(options) {
    var defaults = {
      user_id: '10795563111833728553',
      number: 10
    },
    settings = $.extend({}, defaults, options),
    url = 'http://www.google.com/reader/public/javascript/user/' + settings.user_id + '/state/com.google/broadcast?n=' + settings.number + '&callback=?',
    displayElement = $(this);
    displayElement.empty();
    $.getJSON(url, function(data) {
      var html = [];
      html.push('<ul>');
      $.each(data.items, function(i, item) {
        html.push('<li>');
        var pd = new Date(item.published * 1000);
        html.push('<a class="item-title" href="' + item.alternate.href + '">' + item.title + '</a><br /><span class="item-details">&mdash; ' + 
          (item.author == undefined ? '' : 'by ' + item.author + ' ') + 'via <a href="' + item.origin.htmlUrl + '">' + item.origin.title + 
          '</a> (' + pd.getDate() + '/' + (pd.getMonth() + 1) + '/' + pd.getFullYear() + ')</span>');
        html.push('</li>');
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
})(jQuery);