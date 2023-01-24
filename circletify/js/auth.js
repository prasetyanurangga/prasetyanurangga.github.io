$(document).ready(function () {
  $("#login_btn").on("click", function () {
    var scope = "user-top-read";
    var clien_id = "52e5e86411304e01adffb5bd507b30bc";
    var redirect_uri =
      "https://prasetyanurangga.github.io/circletify/chart.html";
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=" +
      clien_id +
      "&response_type=code&redirect_uri=" +
      redirect_uri +
      "&scope=" +
      scope;
  });
});
