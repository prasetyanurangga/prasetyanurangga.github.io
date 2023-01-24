$(document).ready(function () {
  $("#login_btn").on("click", function () {
    var scope = "user-top-read";
    var clien_id = "336ea6e22aee44608bd14bf083b0aa94";
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
