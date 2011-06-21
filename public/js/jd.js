// Takes an epoch and returns a string representing how long ago the date represents.
function prettyDate(epoch) {
	var date = new Date(epoch * 1000),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

function hideAll() {
  $("#jscontent > div").hide();
  $("#nav a").removeClass("current");
}

function show(id) {
  hideAll();
  $("#a-" + id).attr("class", "current");
  $("#" + id).fadeIn();
}

function registerNavLinks() {
  $("#nav a").click(function(event) {
    event.preventDefault();
    window.location.hash = this.hash;
    show($(this).attr("id").substring(2));
  });
}

function loadSnapping() { $('#snapping .content').flickr(); }
function loadReading() { $('#reading .content').greader(); }
function loadTweeting() { $('#tweeting .content').twitter(); }
function loadListening() { $("#listening .content").lastfm(); }
function loadCoding() { $("#coding .content").github(); }
function loadRunning() { $('#running .content').dailymile(); }
function loadData() {
  loadSnapping();
  loadReading();
  loadTweeting();
  loadListening();
  loadCoding();
  loadRunning();
}

$(document).ready(function() {
  registerNavLinks();
  loadData();

  if (window.location.hash && $(window.location.hash).length) {
    show(window.location.hash.substring(1));
  } else {
    show("snapping");
  }
});