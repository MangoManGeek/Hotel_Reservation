/*var services = { 'service[]' : []};
$(":checked").each(function() {
  data['service[]'].push($(this).val());
});
$.post("/room", data);*/
var price;
// receive data from the server
$(document).ready(function(){
  // get room information
  $.get('/roomInfo', function (data, textStatus, jqXHR){
    $('#roomNum').append(data.roomNum);
    $('#roomType').append(data.roomType);
    $('#roomCap').append(data.roomCap);
    $('#roomPrice').append(data.price);
    price = data.price;
    $('#roomDescription').append(data.description);
  });
  
  /* get review information
  $.get('/reviewInfo', function (data, textStatus, jqXHR){
    var html = '';
    $.each(data, function() {
      html += '<tr>';
      $.each(this, function(key, value){
        if (key === 'hotelId'){
          html += '<td><span>' + value + '</span></td>';
        }
        if (key === 'type'){
          html += '<td>' + value + '</td>';
        }
        if (key === 'review'){
          html += '<td colspan=\"4\"><p>' + value + '</p></td>';
        }
      });
      html += '<tr>';
    });
    document.getElementById("reviews").innerHTML = html;
  });*/
});


jQuery.ajaxSettings.traditional = true;


$(document).ready(function(){
  // collect additional services information
  $('#create').click(function(event){
    event.preventDefault();
    /*
    var services = $("#service-list input:checkbox:checked").map(function(){
      return $(this).val();
    }).get(); */
    
    var services = []//{ 'service' : []};
    $("#service-list input:checkbox:checked").each(function() {
        services.push($(this).val());
    });
    /*var breakfast = $("#breakfast-list input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();*/
    
    var breakfastNum =[]// { 'breakfast' : []};
    breakfastNum.push($("#quantity1 option:selected").val());
    breakfastNum.push($("#quantity2 option:selected").val());
    breakfastNum.push($("#quantity3 option:selected").val());
    breakfastNum.push($("#quantity4 option:selected").val());
    /*
    $("#breakfast-list .quantity").each(function(){
      breakfastNum['breakfast'].push($(this).options.val());
    });*/
      
    $.post("/createReservation", // file name TO BE CHANGED 
    {price: price, service:services, breakfast:breakfastNum},
    function(data,status){
      if (status === 'success'){
        window.location = data.redirect;
      }
      if (status === 'error'){
        alert("Page not found");
      }
    });
  });
});

$(document).ready(function(){
  $("#myres").click(function(){
    $.get('/myReservation', function (data, textStatus, jqXHR){
      window.location = data.redirect;
    });
  });
});