
function golderTicketCountdown() {
  const expired = moment($('#goldenTicketPage .expiredTime').text());
  const expiredTime = moment(expired)
  const currentTime = moment();
  const diffTime = expiredTime - currentTime;

  calTicketAmount()
  if(diffTime>0) {
    setCountdown(diffTime, false);
  }
}

$('#goldenTicketPage input[name="no_of_tickets"]').keyup(function() {
  calTicketAmount()
})

function updateUserTicket(numberTickets) {
  const totalUserTickets = $('#goldenTicketPage td.totalUserTickets').text()
  const totalTickets = $('#goldenTicketPage td.totalTickets').text()

  const updatedTotalUserTickets = parseFloat(totalUserTickets) + numberTickets
  const updatedTotalTickets = parseFloat(totalTickets) + numberTickets
  const updatedWinChange = (updatedTotalUserTickets / updatedTotalTickets) * 100

  $('#goldenTicketPage td.totalUserTickets').text(updatedTotalUserTickets)
  $('#goldenTicketPage td.totalTickets').text(updatedTotalTickets)
  $('#goldenTicketPage td.winChange').text(updatedWinChange.toFixed(2))
}

function calTicketAmount() {
  const numberTickets = $('#goldenTicketPage input[name="no_of_tickets"]').val()
  const pricePerTicket = $('#goldenTicketPage input[name="price_per_ticket"]').val()
  const totalAmountPrice = numberTickets * pricePerTicket

  $('#goldenTicketPage input[name="total_amount_price"]').val(totalAmountPrice)
}

$('button.buyGoldenTicket').click(function(){

  const numberTickets = $('#goldenTicketPage input[name="no_of_tickets"]').val()
  const pricePerTicket = $('#goldenTicketPage input[name="price_per_ticket"]').val()
  const totalAmountPrice = numberTickets * parseFloat(pricePerTicket)
  const currentCoin = $('#homeMenu .currentCoin').text()

  if (parseInt(numberTickets) === 0) return false;

  $(this).attr("disabled", true);
  console.log('sdasdasa');
  const InsufficientError = {
    text: `BUY ERROR: Insufficient balance to purchase ${numberTickets} tickets.`,
    type: 'error',
  }

  if(totalAmountPrice > parseFloat(currentCoin)) {
    $(this).attr('disabled', false);
    return noty(InsufficientError);
  }

  $.post('/golden-ticket', {numberTickets}, function( result ) {
    if (result.error) {
      return noty({
        text: result.message,
        type: 'error'
      });
    }

    updateUserTicket(parseInt(numberTickets));
    $('#homeMenu .currentCoin').text(result.data.updatedCurrentCoin)
    $('button.buyGoldenTicket').attr("disabled", false);
  })
})
