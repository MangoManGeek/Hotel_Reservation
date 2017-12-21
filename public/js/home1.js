function countryChange() {
  var countryState = [
    ['United States', [
      ['', 'State/Province'],
      ['New York', 'New York'],
      ['New Jersey', 'New Jersey'],
      ['Texas', 'Texas'],
      ], ],
    ['China', [
      ['', 'State/Province'],
      ['Beijing', 'Beijing'],
      ['Zhejiang', 'Zhejiang'],
      ['Shanxi', 'Shanxi'],
    ]]
   ];

  var countryElement = document.getElementById('countryId');
  var stateElement = document.getElementById('stateId');
  var stateLabelElement = document.getElementById('stateLabel');
  
  if (countryElement && stateElement) {
    var listOfState = [
      ['XX', 'None']
    ];
    
    var currentCountry = countryElement.options[countryElement.selectedIndex].value;
    for (var i = 0; i < countryState.length; i++) {
      if (currentCountry == countryState[i][0]) {
        listOfState = countryState[i][1];
      }
    }
    
    if (listOfState.length < 1) {
      stateElement.style.display = 'none';
      stateLabelElement.style.display = 'none';
    } else {
      stateElement.style.display = 'inline';
      stateLabelElement.style.display = 'inline';
    }
    
    var selectedState;
    for (var i = 0; i < stateElement.length; i++) {
      if (stateElement.options[i].selected === true) {
        selectedState = stateElement.options[i].value;
      }     
    }
    
    stateElement.options.length = 0;
    for (var i = 0; i < listOfState.length; i++) {
      stateElement.options[i] = new Option(listOfState[i][1], listOfState[i][0]);
      if (listOfState[i][0] == selectedState) {
        stateElement.options[i].selected = true;
      }    
    }      
  }
}

function updatedate() {
  var indate = document.getElementById("indate").value;
  document.getElementById("outdate").setAttribute("min",indate);
  if(document.getElementById("outdate").value==indate){ document.getElementById("outdate").stepUp(1);
  }
}

// send data to server
$(document).ready(function(){
  $('#search-hotel').click(function(){
    $.post("/home", // file name TO BE CHANGED!!!!! 
    {
      country: document.getElementById("countryId").options[document.getElementById("countryId").selectedIndex].value,
      state: document.getElementById("stateId").options[document.getElementById("stateId").selectedIndex].value,
      indate: document.getElementById("indate").value,
      outdate: document.getElementById("outdate").value,
      roomType: document.getElementById("type").options[document.getElementById("type").selectedIndex].value,
    },
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