(function($){
  $(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable":true});
    $("#cargarNews").click(ajaxF)
  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  $(".row").empty()
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      console.log(msg[item]);
      $(".row").append("<div class='col s12 m6 l4'><div class='icon-block'><h2 class='center brown-text'><img src="+msg[item].imageUrl+" width= 300></h2><h5 class='center'>"+msg[item].title+"</h5><p class='light'>"+msg[item].summary+"</p></div><hr></div>")

    };
  }).fail(function () {
    alert("ERROR");
  });
})

function ajaxF(){
  $(".collection").empty()
  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      console.log(msg[item]);
      $(".collection").append("<a href='#' onclick='window.open('http://www.nasa.com/abc.html', '_system'); return false;' class='collection-item' id=" + msg[item].id + ">"+ msg[item].title +"</a>")

    };
    $(".collection-item").click(function(){
      $('.tabs').tabs("select","test-swipe-2")
      var article= $(this).attr("id");
      var article= "https://api.spaceflightnewsapi.net/v3/articles/"+ article.toString();
      fArticle(article)
    })
  }).fail(function () {
    alert("ERROR");
  });
}

function fArticle(artURL){
  $.ajax({
    method: "GET",
    url: artURL,
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
      $('#test-swipe-2').append("<h2 id='h1Article'>"+msg['title']+"</h2>")
      $('#test-swipe-2').append("<center><img id='imgArticle' src="+msg['imageUrl']+"></center>")
      $('#test-swipe-2').append("<p id='pSummary'>"+msg['summary']+"</p>")
      $('#test-swipe-2').append("<p id='pPublished'>"+msg['publishedAt']+"</p>")

  }).fail(function () {
    alert("ERROR");
  });
}