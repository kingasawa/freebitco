$(function() {

  $('select.dropdown')
    .dropdown()
  ;

  // eslint-disable-next-line no-undef
  $('form#login').submit(function(e){
    e.preventDefault();
    console.log('submit xxx');
  });

  var countDownDate = moment('2020-07-14T14:27:03+07:00')
  console.log('countDownDate', countDownDate);

  var x = setInterval(function() {
    diff = countDownDate.diff(moment());

    if (diff <= 0) {
      clearInterval(x);
      // If the count down is finished, write some text
      $('.countdown').text("EXPIRED");
    } else
      $('.countdown').text(moment.utc(diff).format("HH:mm:ss"));

  }, 1000);
});
