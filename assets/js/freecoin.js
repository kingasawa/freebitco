$(function() {

  var countDownDate = moment('2020-07-14T14:27:03+07:00')

  var x = setInterval(function() {
    diff = countDownDate.diff(moment());

    if (diff <= 0) {
      clearInterval(x);
      // If the count down is finished, write some text
      $('.countdown').text('EXPIRED');
    } else {
      $('.countdown').text(moment.utc(diff).format('HH:mm:ss'));
    }


  }, 1000);

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


// <div class="rollPoint"></div>
//            <div class="rollTimeExpired"></div>
//  <div>
//   <p>before you can play for free again.</p>
//  <div class="ui yellow message">Bet on the latest events and win big prizes!</div>
//                                                                                                                                 </div>
