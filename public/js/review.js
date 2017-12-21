function detailChange() {
  var reviewDetail = [
    ['room', [  ['', 'N/A'] ] ],
    ['breakfast', [
      ['', 'Select Breakfast Type'],
      ['French', 'French'],
      ['Chinese', 'Chinese'],
      ['American', 'American'],
      ['Japanese', 'Japanese'],
      ], ],
    ['service', [
      ['', 'Select Service Type'],
      ['Airport Pickup', 'Airport Pickup'],
      ['Airport Dropoff', 'Airport Dropoff'],
      ['Parking', 'Parking'],
      ['Laundry', 'Laundry']
    ]]
   ];

  var reviewElement = document.getElementById('reviewType');
  var detailedElement = document.getElementById('detailedType');
  
  if (reviewElement && detailedElement) {
    var listOfType = [
      ['XX', 'None']
    ];
    
    var currentReview = reviewElement.options[reviewElement.selectedIndex].value;
    for (var i = 0; i < reviewDetail.length; i++) {
      if (currentReview == reviewDetail[i][0]) {
        listOfType = reviewDetail[i][1];
      }
    }
    
    if (listOfType.length < 1) {
      detailedElement.style.display = 'none';
    } else {
      detailedElement.style.display = 'inline';
    }
    
    var selectedDetail;
    for (var i = 0; i < detailedElement.length; i++) {
      if (detailedElement.options[i].selected === true) {
        selectedDetail = detailedElement.options[i].value;
      }     
    }
    
    detailedElement.options.length = 0;
    for (var i = 0; i < listOfType.length; i++) {
      detailedElement.options[i] = new Option(listOfType[i][1], listOfType[i][0]);
      if (listOfType[i][0] == selectedDetail) {
        detailedElement.options[i].selected = true;
      }    
    }      
  }
}

$(document).ready(function(){
  $("#myres").click(function(){
    $.get('/myReservation', function (data, textStatus, jqXHR){
      window.location = data.redirect;
    });
  });
});

// collect review information
$(document).ready(function(){
  $('#contact-submit').click(function(){
    $.post("/review",
    {
      reviewType: document.getElementById("reviewType").options[document.getElementById("reviewType").selectedIndex].value,
      rating: document.getElementById("rating").options[document.getElementById("rating").selectedIndex].value,
      userName: document.getElementById("username").value,
      email: document.getElementById("email").value,
      detailedType: document.getElementById("detailedType").options[document.getElementById("detailedType").selectedIndex].value,
      text: document.getElementById("comment").value
    },
    function(data,status){
      if(status==='success'){
        window.location=data.redirect;
      }
      if (status === 'error'){
        alert("Page not found");
      }
    });
  });
});