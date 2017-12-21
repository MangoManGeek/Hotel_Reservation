$('.message a').click(function(){
   $('.f').animate({height: "toggle", opacity: "toggle"}, "slow");
});


// user login
$(document).ready(function(){
    $('#userlogin').click(function(){
        $.post("/login", // file name TO BE CHANGED 
        {
          username: document.getElementById("username1").value,
          password: document.getElementById("password1").value
        },
        function(data,status){
          if (status === 'success'){
       /*     $(window).load(function(){
              sessionStorage.setItem('status','loggedIn');
            });*/
            window.location = data.redirect;
          }
          if (status === 'error'){
            alert("Page not found");
          }
        });
    });
});

// admin login
$(document).ready(function(){
    $('#admin-login').click(function(){
        $.post("/login", // file name TO BE CHANGED 
        {
          username: document.getElementById("username2").value,
          password: document.getElementById("password2").value
        },
        function(data,status){
          if (status === 'success'){
            /*$(window).load(function(){
              sessionStorage.setItem('status','loggedIn');
            });*/
            window.location = data.redirect;
          }
          if (status === 'error'){
            alert("Page not found");
          }
       });
    });
});

// register
$(document).ready(function(){
  $('#register').click(function(){
    $.post("/register",
           {userName: document.getElementById("username").value,
            password: document.getElementById("password").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
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