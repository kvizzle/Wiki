var link = "";
var x = 500;

function randomWiki() {

  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");

}

function search() {

  var searchName = $("#search").val();
  console.log(searchName);
  if ($("#search").val() === "") {
    console.log("nah bruv");
    return false;
  }

  //document.getElementById('search').value;
  $(".results").html("");

  var link = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchName + "&format=json";
  console.log(link);

  $.ajax({
      url: link,
      dataType: "jsonp",
      jsonp: "callback",
    })
    .done(function(response) {
      console.log(link);

      init(response);

    })
    .fail(function() {
      console.log("error");
    })
};

function init(response) {

  $(response).each(function(i, val) {
    if (val.query.search.length <= 0) {
      $(".results").text("Your search has no results!");

    }

    $.each(val.query.search, function(key, val) {

      var endPoint = "https://en.wikipedia.org/wiki/";
      var title = val.title;
      var snippet = val.snippet;

      $(".results").hide().append("<a class='resultArea'  href='" + endPoint + title + "'target='_blank' >" + title + "<br><br><p class='snippet'" + snippet + "...</p></a><br><br>").fadeIn();

    });
  });
}

$(document).ready(function() {
  $(".submit").click(function() {

    search();
    return false;
  });

  $(".random").click(function() {

    randomWiki();
    return false;
  });

});