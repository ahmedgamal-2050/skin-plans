$(document).ready(function () {
  let animatetext = function () {
    let elements = $("#typewriter-holder .d-none");
    $(".tw-container").tickerText(elements, 0, 3, 100, 1 / 0, 0.75, 2, false);
  }
  $(animatetext);
});