function hideAll() {
  $("#jscontent > div").hide();
  $("#nav a").removeClass("current");
}

function show(id) {
  hideAll();
  $("#" + id).show();
  $("#a-" + id).attr("class", "current");
}

function registerNavLinks() {
  $("#nav a").click(function() { show($(this).attr("id").substring(2)); });
}

function loadSnapping() {
  $('#snapping .content').flickr();
}

function loadReading() {
  $('#reading .content').greader();
}

$(document).ready(function() {
  registerNavLinks();
  loadSnapping();
  loadReading();

  if (window.location.hash && $(window.location.hash).length) {
    show(window.location.hash.substring(1));
  } else {
    show("snapping");
  }
});