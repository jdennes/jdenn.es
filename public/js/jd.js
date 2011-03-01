function hideAll() {
  $("#snapping").hide();
  $("#reading").hide();
  $("#tweeting").hide();
  $("#listening").hide();
  $("#coding").hide();
  $("#running").hide();
  $("#nav a").each(function() {
    $(this).removeClass("current");
  });
}

function show(id) {
  hideAll();
  $("#" + id).show();
  $("#a-" + id).attr("class", "current");
}

function registerNavLinks() {
  $("#a-snapping").click(function() { show("snapping"); });
  $("#a-reading").click(function() { show("reading"); });
  $("#a-tweeting").click(function() { show("tweeting"); });
  $("#a-listening").click(function() { show("listening"); });
  $("#a-coding").click(function() { show("coding"); });
  $("#a-running").click(function() { show("running"); });
}

$(document).ready(function() {
  registerNavLinks();
  
  // TODO: Load all the content asynchronously using the respective 
  // individual scripts/jQuery plugins...
  
  if (window.location.hash && $(window.location.hash).length) {
    show(window.location.hash.substring(1));
  } else {
    show("snapping");
  }
});