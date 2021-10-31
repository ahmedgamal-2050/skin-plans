// Set the date we're counting down to
var countDownDate = new Date("Nov 2, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  //console.log(distance);

  // Time calculations for hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hours = (hours < 10) ? ('0' + hours) : hours;
  minutes = (minutes < 10) ? ('0' + minutes) : minutes;
  seconds = (seconds < 10) ? ('0' + seconds) : seconds;
  // Display the result in the element with id="countdown-timer"
  document.getElementById("countdown-timer").innerHTML = hours + " : "
    + minutes + " : " + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-timer").innerHTML = "إنتهاء تاريخ صلاحية الكود !!";
  }
}, 1000);