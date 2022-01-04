function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
jQuery.isSubstring = function(haystack, needle) {
  return haystack.indexOf(needle) !== -1;
};
function goToNews(index){
  document.cookie = "index="+index;
  window.location.href = window.location.origin+"/news.html";
}
$("#searchBtn").click(function() {
  $("#searchList").empty();
  var isEmpty = true;
  var searchText = $("#searchInput").val();
  if(searchText !== "") {
    $.getJSON(window.location.origin+"/data/json/news.json", function(data) {
      $.each(data, function(i, v) {
        var isContains = false;
        if($.isSubstring(v.title,searchText) || $.isSubstring(v.date,searchText) || $.isSubstring(v.description,searchText) 
        || $.isSubstring(v.all_text,searchText)){
          isContains = true;
          isEmpty = false;
        }
        if(isContains){
          $("#searchList").append("<div class=\"col-md-12 mb-2\"><div class=\"row featurette rounded-3 bg-news\"><div class=\"col-md-7 order-md-2\"><h2 class=\"featurette-heading\">"+v.title+"<br><span class=\"text-muted\"> Дата: "+v.date+"</span></h2></div><div class=\"col-md-5 order-md-1\"><img src=\""+v.img[0]+"\" class=\"bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto\" width=\"500\"><a class=\"btn btn-secondary d-flex justify-content-center my-4\" href=\"javascript: goToNews('"+i+"')\">Переглянути детальніше »</a></div></div></div>");
        }
      });
      if(isEmpty){
        $("#searchList").append("<h3 class=\"text-center text-white\">Нічого не знайдено!</h3>");
      }
      $('#searchModal').modal('show')
    });
  }
});
function ShowWeather (){
  var myOffcanvas = $('#weather_panel');
  var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
  bsOffcanvas.show();
}