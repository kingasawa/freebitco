const TIMEOUT = 1200

function lotteryPageLoad() {
  lotteryCountdown();
  updateLotteryBoard();
  setInterval(function(){
    const randomNum = Math.floor(Math.random() * 10) + 1;
    $.post('/lottery/random', {}, function( result ) {
      // console.log('resultxxx', result);
      updateTotalTicket(result.buyTicket);
      updateLotteryBoard();
      updateUserWinChange();
      });
  }, TIMEOUT);
}

function updateTotalTicket(numberTicket) {
  const totalTickets = $('#lotteryPage td.totalTickets').text()
  const currentTotalTicket = parseInt(totalTickets) + numberTicket
  $('#lotteryPage td.totalTickets').text(currentTotalTicket)
}

function updateLotteryBoard() {
  const totalTickets = $('#lotteryPage td.totalTickets').text()
  const pricePerTicket = $('#lotteryPage input[name="price_per_ticket"]').val()
  const totalAmountPrice = totalTickets * pricePerTicket
  const realAmount = totalAmountPrice * 0.9 // -10%
  const first = (realAmount / 10).toFixed(10)
  const second = (first / 2).toFixed(10)
  const third = (second / 2).toFixed(10)
  const fourth = (third / 2).toFixed(10)
  const fifth = (fourth / 2).toFixed(10)
  const sixth = (fifth / 2).toFixed(10)
  const seventh = (sixth / 2).toFixed(10)
  const eighth = (seventh / 2).toFixed(10)
  const ninth = (eighth / 2).toFixed(10)
  const tenth = (ninth / 2).toFixed(10)

  $('#lotteryPage span.first').text(first);
  $('#lotteryPage span.second').text(second);
  $('#lotteryPage span.third').text(third);
  $('#lotteryPage span.fourth').text(fourth);
  $('#lotteryPage span.fifth').text(fifth);
  $('#lotteryPage span.sixth').text(sixth);
  $('#lotteryPage span.seventh').text(seventh);
  $('#lotteryPage span.eighth').text(eighth);
  $('#lotteryPage span.ninth').text(ninth);
  $('#lotteryPage span.tenth').text(tenth);
}

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

function updateUserWinChange() {
  const totalUserTickets = $('#lotteryPage td.totalUserTickets').text()
  const totalTickets = $('#lotteryPage td.totalTickets').text()
  const updatedWinChange = (parseInt(totalUserTickets) / parseInt(totalTickets)) * 100
  $('#lotteryPage td.winChange').text(`${updatedWinChange.toFixed(2)}%`)
}

function updateUserTicket(numberTickets) {
  const totalUserTickets = $('#lotteryPage td.totalUserTickets').text()
  const totalTickets = $('#lotteryPage td.totalTickets').text()

  const updatedTotalUserTickets = parseFloat(totalUserTickets) + numberTickets
  const updatedWinChange = (totalTickets / updatedTotalUserTickets) * 100

  $('#lotteryPage td.totalUserTickets').text(updatedTotalUserTickets)
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

    updateTotalTicket();
    updateLotteryBoard()
    updateUserTicket(parseInt(numberTickets));
    $('#homeMenu .currentCoin').text(`${result.data.updatedCurrentCoin} ILU`)
    $('button.buyLotteryTicket').attr("disabled", false);
  })
})
