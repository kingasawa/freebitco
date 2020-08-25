$(function() {

  const latestRollTimeValue = $('.latestRollTime').text();
  var latestRollTime = moment(latestRollTimeValue); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
  var expiredTime= moment(latestRollTime).add(1, 'hours'); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT

  var currentTime = moment();
  var diffTime = expiredTime - currentTime;
  var duration = moment.duration(diffTime, 'milliseconds');
  var interval = 1000;

  $('.eventTime').text(expiredTime)
  $('.currentTime').text(currentTime)

  $('.showCountdown').addClass('hidden');

  if(diffTime > 0) {
    $('.showCountdown').removeClass('hidden');
    $('.showRoll').addClass('hidden');
    const expired = setInterval(function(){
      duration = moment.duration(duration - interval, 'milliseconds');
      console.log('duration', duration);
      // $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
      $('.countdownDays').text(duration.days())
      $('.countdownHours').text(duration.hours())
      $('.countdownMinutes').text(duration.minutes())
      $('.countdownSeconds').text(duration.seconds())

    }, interval);

    setTimeout(() => {
      $('.showRoll').removeClass('hidden');
      $('.date_count_down').addClass('hidden');
      clearInterval(expired)
    }, diffTime);

  }

});
