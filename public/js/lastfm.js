(function($){
  $.fn.lastfm = function(options) {
    var defaults = {
      number: 10,
      username: 'jdennes',
      apikey: '3ab5290b3f5973475ef258a41323fdad',
      noart: 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_artist_small.png'
    },
    settings = $.extend({}, defaults, options),
    url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + settings.username +
      '&api_key=' + settings.apikey + '&limit=' + settings.number + '&format=json&callback=?',
    displayElement = $(this);
    displayElement.empty();
    $.getJSON(url, function(data) {
      var html = [];
      html.push('<ul>');
      $.each(data.recenttracks.track, function(i, item) {
        var art = '';
        if (item.image[1]['#text'] == '') {
          art = settings.noart;
        } else {
          art = stripslashes(item.image[0]['#text']); // Small
        }
        var songUrl = stripslashes(item.url);
        var song = item.name;
        var artist = item.artist['#text'];
        var album = item.album['#text'];
        var time = '';
        if (item.date) { time = item.date['uts']; }
        var nowPlaying = '';
        if (item.hasOwnProperty('@attr')) { nowPlaying = item['@attr']['nowplaying']; }
        var when = prettyDate(time);
        html.push('<li>');
        html.push('<span class="art"><a class="song-title" href="' + songUrl + '" target="_blank"><img width="34" height="34" src="' + art + '" alt="' + album + '" /></a></span>');
        html.push('<span class="details"><a class="song-title" href="' + songUrl + '" target="_blank">' + song + '</a> &mdash; ' + artist + '</span><br />' + 
          '<span class="when">' + (nowPlaying == "true" ? '<img width="12" height="12" src="http://cdn.last.fm/flatness/global/icon_eq.gif" alt="Now playing" /> ' : '') + 
            (when == undefined && nowPlaying == "true" ? "Now playing" : when) + '</span>');
        html.push('</li>');
      });
      html.push('</ul>');
      displayElement.html(html.join(''));
    });
  };
  function stripslashes(str) {
    return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
  }
})(jQuery);