
function setCountdown(expiredTime, reload) {
  let duration = moment.duration(expiredTime, 'milliseconds');
  const interval = 1000;
  $('.showRoll').addClass('hidden')
  $('.showCountdown').removeClass('hidden')
  setInterval(function(){
    duration = moment.duration(duration - interval, 'milliseconds');
    $('.countdownDays').text(duration.days())
    $('.countdownHours').text(duration.hours())
    $('.countdownMinutes').text(duration.minutes())
    $('.countdownSeconds').text(duration.seconds())
  }, interval);

  setTimeout(() => {
    if (reload) location.reload();
    else $('.expiredDisable').addClass('hidden')
  }, expiredTime);
}
