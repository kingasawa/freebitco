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
        return divResponseData
          .append(`<div class="ui red message">${data.message}</div>`)
      }

      return divResponseData
        .append(`<p>Number: ${data.number}</p>`)
        .append(`<p>Coin: ${data.coin}</p>`)
    });
  });

});
