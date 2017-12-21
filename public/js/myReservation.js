$(document).ready(function(){
  $.get('/getMyReservation', function (data, textStatus, jqXHR) {
    /* my profile */
    var profile = data.profile;
    $("#username").append(profile.username);
    $("#email").append(profile.email);
    $("#address").append(profile.address);
    $("#name").append(profile.name);
    $("#phone").append(profile.phone);
 
    // my reservation
    var res = data.reservation;
    var html = '';
    var roomid;
    //$.each(res, function(key, value) {
      html += '<li><img src=\"https://t-ec.bstatic.com/images/hotel/max1024x768/782/78268208.jpg\" alt=\"\" />';
      $.each(res, function(key, value) {
        if (key === "roomNum"){
          html += '<div class=\"hotel-name\">Room Number: ' + value + '</div>';
          roomid = value;
        }
        if (key === "indate"){
          html += '<div class=\"info\">Days:<span>' + value + '</span> - ';
        }
        if (key === "outdate"){
          html += '<span>' + value + '</span></div>';
        }
        if (key === "roomType"){
          html += '<div class=\"info\">Room Type: <span>' + value + '</span><span class=\"discount\"></span></div>';
        }
        if (key === "price"){
          html += '<div class=\"info\">Price: <span>' + value + '</span><span class=\"discount\"></span></div>';
        }
      });
      html += '<div class=\"btn\" name=\"select\" type=\"select\" id=\"' + roomid + '\" ><a href=\"/html/review.html\">Write a Review</a></div></li>';
    //});
    document.getElementById("list").innerHTML = html;
  });
});

  // send a hotelId to the server
function sendPost(id){
  $.post("/roomNum", // file name TO BE CHANGED 
  {roomNum: id},
  function(data,status){
    if (status === 'success'){
      window.location = data.redirect; 
    }
    if (status === 'error'){
      alert("Page not found");
    }
  });
}