var Data = null;
var index = getCookie("index");
if(index >= 0){}else{
  index = 0;
}
$.getJSON(window.location.origin+"/data/json/news.json", function(data) {
  $.each(data, function(i, v) {
    if(i == index){
      Data = v;
      return false;
    }
  });
  $("#title").text(Data.title);
  $("#description").text(Data.description);
  $.each(Data.img, function(i, v) {
    if(i == 0){
      $("#slider").append("<div class=\"carousel-item active\"><div style=\"background-image: url("+v+");\" class=\"d-block w-100\"></div></div>")
    }else{
      $("#slider").append("<div class=\"carousel-item\"><div style=\"background-image: url("+v+");\" class=\"d-block w-100\"></div></div>")
    }
  });
  $("#all-text").html(Data.all_text);
});