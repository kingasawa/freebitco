
$(function() {

  $('form#requestRoll').submit(function(e){
    e.preventDefault();
    $.post( '/free', $(this).serializeArray(), function( data ) {
      const divResponseData = $('.rollResponse');
      grecaptcha.reset();
      console.log('dataxxx', data);
      if(data.error) {
        divResponseData.removeClass('hidden');
        return divResponseData
          .append(`<div class="ui red message">${data.message}</div>`)
      }

      const expiredTime= moment(data.expiredTime);
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

function freeCoinCountdown() {
  const expired = moment($('#freeBitcoinPage .expiredTime').text());
  const expiredTime = moment(expired)
  const currentTime = moment();
  const diffTime = expiredTime - currentTime;

  if(diffTime > 0) {
    setCountdown(diffTime, true);
  } else {
    $('.showRoll').removeClass('hidden')
  }
}
