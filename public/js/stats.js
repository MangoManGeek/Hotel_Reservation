$(document).ready(function(){
  $("#myres").click(function(){
    $.get('/myReservation', function (data, textStatus, jqXHR){
      window.location = data.redirect;
    });
  });
});

// modify date selection
function updatedate() {
  var indate = document.getElementById("indate").value;
  document.getElementById("outdate").setAttribute("min",indate);
  if(document.getElementById("outdate").value == indate) { 
    document.getElementById("outdate").stepUp(1);
  }
}

// collect search information
$(document).ready(function(){
    $('#search-hotel').click(function(){
        $.post("/stats", 
        {
          category: document.getElementById("category").options[document.getElementById("category").selectedIndex].value,
          indate: document.getElementById("indate").value,
          outdate: document.getElementById("outdate").value
        },
        function(data,status){
          if (status === 'success'){
            var html = '';
            $.each(data, function() {
              html += '<tr>';
              $.each(this, function(key, value){
                if (key === "hotelId"){
                  html += '<td>' + value + '</td>';
                }
                if (key === "type"){
                  html += '<td>' + value + '</td>';
                }
                if (key === "max"){
                  html += '<td>' + value + '</td>';
                }
              });
              html += '</tr>';
            });
            document.getElementById("list").innerHTML = html;
          }
          if (status === 'error'){
            alert("Page not found");
          }
        });
    });
});

/* display queries onto the list
$(document).ready(function(){
  $.get('/stats', function (data, textStatus, jqXHR){
    var html = '';
    $.each(data, function() {
      html += '<tr>';
      $.each(this, function(key, value){
        if (key === "hotelId"){
          html += '<td>' + value + '<td>';
        }
        if (key === "type"){
          html += '<td>' + value + '<td>';
        }
        if (key === "rating"){
          html += '<td>' + value + '<td>';
        }
      });
      html += '</tr>';
    });
    document.getElementById("list").innerHTML = html;
  });
});*/