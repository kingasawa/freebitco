const expiredAddTime = {
  amount: 10,
  // unit: 'seconds'
  unit: 'minutes'
  // unit: 'hours'
}
$(function() {

  $( document ).ready(function() {
    const latestRollTime = moment($('.latestRollTime').text());
    const expiredTime= moment(latestRollTime).add(expiredAddTime.amount, expiredAddTime.unit);
    const currentTime = moment();
    const diffTime = expiredTime - currentTime;

    if(diffTime>0) {
      setCountdown(diffTime, true);
    }
  });

  $('form#requestRoll').submit(function(e){
    e.preventDefault();
    $.post( '/free', $(this).serializeArray(), function( data ) {
      const divResponseData = $('.rollResponse');
      grecaptcha.reset();
      if(data.error) {
        divResponseData.removeClass('hidden');
        return divResponseData
          .append(`<div class="ui red message">${data.message}</div>`)
      }

      const expiredTime= moment(data.latest_roll_time).add(expiredAddTime.amount, expiredAddTime.unit);
      const currentTime = moment();
      const diffTime = expiredTime - currentTime;

      setCountdown(diffTime, true);
      $('.currentCoin').html(`${data.currentCoin} BTC`)
      return divResponseData
        .empty()
        .append(`<div class="rollPoint">${data.number}</div>`)
        .append(`<div class="ui yellow message">You win ${data.coin} ILU, <span class="ui red text">${data.lotteryTicket} free lottery tickets</span> and <span>${data.rewardPoint} reward points</span>!</div>`)
    });
  });

});

function setCountdown(expiredTime, reload){
  let duration = moment.duration(expiredTime, 'milliseconds');
  const interval = 1000;
  $('.showRoll').addClass('hidden')
  $('.showCountdown').removeClass('hidden')
  const expired = setInterval(function(){
    duration = moment.duration(duration - interval, 'milliseconds');
    $('.countdownDays').text(duration.days())
    $('.countdownHours').text(duration.hours())
    $('.countdownMinutes').text(duration.minutes())
    $('.countdownSeconds').text(duration.seconds())
  }, interval);

  if (reload) {
    setTimeout(() => {
      location.reload();
      // $('.rollResponse').addClass('hidden')
      // $('.showRoll').removeClass('hidden');
      // $('.showCountdown').addClass('hidden');
      clearInterval(expired)
    }, expiredTime);
  }
}
