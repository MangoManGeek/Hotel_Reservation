$(document).ready(function(){
  $.get('/queryHotels', function (data, textStatus, jqXHR){
    var html = '';
    var currentid;
    $.each(data, function() {
      /*
      var info = JSON.parse(this);
      html += '<li class=\"hotel\"><img src=\"https://s-ec.bstatic.com/images/hotel/max1024x768/863/86325270.jpg\" />';
      html += '<div class=\"hotel-name\"><a href=\"#\">' + info.hotelId + '</a></div>';
      html += '<div class=\"info\">Price: <span>' + info.price + '</span></div>';
      html += '<div class=\"info\">Location: <span>' + info.location + '</span></div>';
      html += '<div class=\"btn\" name=\"select\" type=\"select\" id=\"' + info.hotelId + '\" data-submit=\"...Sending\"><a href=\"#\">Select</a></div></li>';
    });*/
      
      
      html += '<li class=\"hotel\"><img src=\"https://s-ec.bstatic.com/images/hotel/max1024x768/863/86325270.jpg\" />';
      $.each(this, function(key, value){
        if (key === 'hotelId'){
          html += '<div class=\"hotel-name\"><a href=\"#\">' + value + '</a></div>';
          currentid = value;
        }
        if (key === 'price'){
          html += '<div class=\"info\">Price: <span>' + value + '</span></div>';
        }
        if (key === 'location'){
          html += '<div class=\"info\">Location: <span>' + value + '</span></div>';
        }
      });
      html += '<div class=\"btn\" name=\"select\" type=\"select\" id=\"' + currentid + '\" onclick=\"sendPost(this.id);\" >Select</div></li>';
    });
    document.getElementById("list").innerHTML = html;
  });
});
/*
// send a hotelId to the server
$(document).ready(function(){
  $('.btn').click(function(event){
    event.preventDefault();
    alert('here');
    var hid = event.target.id;
    $.post("/hid", // file name TO BE CHANGED 
    {hid},
    function(data,status){
      console.log(status);
      console.log(data);
      if (status === 'success'){
        window.location = data.redirect; 
      }
      if (status === 'error'){
        alert("Page not found");
      }
    });
  });
//});*/

function sendPost(id){
    
    //var hid = this.id//event.target.id;
    //alert(id);
    $.post("/hid", // file name TO BE CHANGED 
    {hid:id},
    function(data,status){
      console.log(status);
      console.log(data);
      if (status === 'success'){
        window.location = data.redirect; 
      }
      if (status === 'error'){
        alert("Page not found");
      }
    });
}







