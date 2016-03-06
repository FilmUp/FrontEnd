/**
 * Created by lwelch on 2/11/16.
 */


var ServerURLBase = "http://tmp.filmup.co:8888";

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  $("#loginForm").submit(function (e){
    e.preventDefault();
    if ( $(this).parsley().isValid() ) {
      window.location.replace("http://tmp.filmup.co/feed.html");
    }
  });

  //Submit the sign up Form
  $("#signupForm").submit(function (e) {
    // prevents the page from reloading
    e.preventDefault();
    //Ensures that everything on the form is valid using jQuery validation plugin
    if ( $(this).parsley().isValid() ) {
      //converts the human date to Unxi date

      var userInfo = {
        fName: $("#fName").val(),
        lName: $("#lName").val(),
        email: $("#email").val(),
        location: $("#location").val(),
        major: $("#major").val(),
        university: $("#school").val(),
        password: $("#password").val(),
        type: 'student'
      };
      var str = jQuery.param( userInfo );
      console.log(str);
      //creates a user with the user's info
      $.ajax({
          url: ServerURLBase + "/api/V1/auth/register?" + str,
          type: 'POST',
         // data: JSON.stringify(userInfo),
          contentType: 'application/json',
          statusCode: {
            400: function (errorMessage) {
              if (errorMessage.responseJSON.error === "That Email is Already Registered") {
                $("#email").after($('<label>')
                  .addClass("error")
                  .html("Account with that email already exists"));
              }
            }
          }
        })
        .success(function (response) {
          //sets the auth id to local storage to be used later
          //rests the form fields
          $('#email').val('');
          $('#fName').val('');
          $('#password').val('');

          //redirects user to the player page
          window.location = '/registered.html';
        })
        .error(function (errorMessage) {
          console.log(errorMessage.responseText);
        });
    }
  });

});

//localStorage.setItem('userAuthID', JSON.stringify(response.authID));