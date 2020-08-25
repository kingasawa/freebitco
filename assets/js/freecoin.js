$(function() {

  $('form#requestRoll').submit(function(e){
    e.preventDefault();
    $.post( '/free', $(this).serializeArray(), function( data ) {
      console.log('data', data);
      const divResponseData = $('.rollResponse');
      if(data.error) {
        divResponseData.removeClass('hidden');
        return divResponseData
          .append(`<div class="ui red message">${data.message}</div>`)
      }

      $('.currentCoin').html(`${data.currentCoin} BTC`)
      return divResponseData
        .empty()
        .append(`<div class="rollPoint">${data.number}</div>`)
        .append(`<div class="ui yellow message">You win ${data.coin} ILU, <span class="ui red text">${data.lotteryTicket} free lottery tickets</span> and <span>${data.rewardPoint} reward points</span>!</div>`)
    });
  });

});
