

function getDate(){
var expDate = '' + document.getElementById("ExpiryDate").value;
expDate += '-1';
return expDate;
}




$(function () {
  //$('[data-toggle="popover"]').popover();
  $('#cvc').on('click', function(){
    if ( $('.cvc-preview-container').hasClass('hide') ) {
      $('.cvc-preview-container').removeClass('hide');
    } else {
      $('.cvc-preview-container').addClass('hide');
    }    
  });
  
  $('.cvc-preview-container').on('click', function(){
    $(this).addClass('hide');
  });
});

$(document).ready(function(){
  $.get('/getTotal', function (data, textStatus, jqXHR){
    $('#total1').append(data.total);
    $('#total2').append(data.total);
  });
});

// collect payment info
$(document).ready(function(){
    $('#PayButton').click(function(){
        $.post("/pay", // file name TO BE CHANGED 
        {
          type: document.getElementById("cardType").options[document.getElementById("cardType").selectedIndex].value,
          name: document.getElementById("NameOnCard").value,
          Cnumber: document.getElementById("CreditCardNumber").value,
          expDate:  getDate(),// document.getElementById("ExpiryDate").value,
          secCode: document.getElementById("SecurityCode").value,
          billingAddr: document.getElementById("Address").value,
          //zip: document.getElementById("ZIPCode").value
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