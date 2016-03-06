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
  var ServerURLBase = "http://tmp.filmup.co:8888";
  code = getParameterByName('code');
  $.ajax({
      url: ServerURLBase + "/api/V1/auth/verify?code=" + code,
      type: 'POST',
      contentType: 'application/json'
    })
    .success(function (response) {
      window.location = '/login.html';
    })
    .error(function (errorMessage) {
      console.log("fuck");
    });
});
