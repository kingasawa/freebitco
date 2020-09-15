
function lotteryCountdown() {
  const expired = moment($('#lotteryPage .expiredTime').text());
  const expiredTime = moment(expired)
  const currentTime = moment();
  const diffTime = expiredTime - currentTime;

  calTicketAmount()
  if(diffTime>0) {
    setCountdown(diffTime, false);
  }
}

$('#lotteryPage input[name="no_of_tickets"]').keyup(function() {
  calTicketAmount()
})

function updateUserTicket(numberTickets) {
  const totalUserTickets = $('#lotteryPage td.totalUserTickets').text()
  const totalTickets = $('#lotteryPage td.totalTickets').text()

  const updatedTotalUserTickets = parseFloat(totalUserTickets) + numberTickets
  const updatedTotalTickets = parseFloat(totalTickets) + numberTickets
  const updatedWinChange = (updatedTotalUserTickets / updatedTotalTickets) * 100

  $('#lotteryPage td.totalUserTickets').text(updatedTotalUserTickets)
  $('#lotteryPage td.totalTickets').text(updatedTotalTickets)
  $('#lotteryPage td.winChange').text(`${updatedWinChange.toFixed(2)}%`)
}

function calTicketAmount() {
  const numberTickets = $('#lotteryPage input[name="no_of_tickets"]').val()
  const pricePerTicket = $('#lotteryPage input[name="price_per_ticket"]').val()
  const totalAmountPrice = numberTickets * pricePerTicket

  $('#lotteryPage input[name="total_amount_price"]').val(totalAmountPrice.toFixed(8))
}

$('button.buyLotteryTicket').click(function(){

  const numberTickets = $('#lotteryPage input[name="no_of_tickets"]').val()
  const pricePerTicket = $('#lotteryPage input[name="price_per_ticket"]').val()
  const totalAmountPrice = numberTickets * parseFloat(pricePerTicket)
  const currentCoin = $('#homeMenu .currentCoin').text()

  if (parseInt(numberTickets) === 0) return false;

  $(this).attr("disabled", true);
  const InsufficientError = {
    text: `BUY ERROR: Insufficient balance to purchase ${numberTickets} tickets.`,
    type: 'error',
  }

  if(totalAmountPrice > parseFloat(currentCoin)) {
    $(this).attr('disabled', false);
    return noty(InsufficientError);
  }

  $.post('/lottery', {numberTickets}, function( result ) {
    if (result.error) {
      return noty({
        text: result.message,
        type: 'error'
      });
    }

    updateUserTicket(parseInt(numberTickets));
    $('#homeMenu .currentCoin').text(`${result.data.updatedCurrentCoin} ILU`)
    $('button.buyLotteryTicket').attr("disabled", false);
  })
})
