$(function(){

  function updateNumberJackpot (number) {
    console.log('number', number);
    const splitNumber = number.toString().split('')
    let first = 0;
    let second = 0;
    let third = 0;
    let fourth = 0;
    let fifth = 0;
    switch (splitNumber.length) {
      case 1:
        fifth = splitNumber[0];
        break;
      case 2:
        fourth = splitNumber[0];
        fifth = splitNumber[1];
        break;
      case 3:
        third = splitNumber[0];
        fourth = splitNumber[1];
        fifth = splitNumber[2];
        break;
      case 4:
        second = splitNumber[0];
        third = splitNumber[1];
        fourth = splitNumber[2];
        fifth = splitNumber[3];
        break;
      case 5:
        first = splitNumber[0];
        second = splitNumber[1];
        third = splitNumber[2];
        fourth = splitNumber[3];
        fifth = splitNumber[4];
        break;
    }
    $('#multipleCoinPage #firstJackpotNumber').text(first)
    $('#multipleCoinPage #secondJackpotNumber').text(second)
    $('#multipleCoinPage #thirdJackpotNumber').text(third)
    $('#multipleCoinPage #fourthJackpotNumber').text(fourth)
    $('#multipleCoinPage #fifthJackpotNumber').text(fifth)
  }

  $('#multipleCoinPage #manualBet input[name="betAmount"]').keyup(function() {
    const betAmount = $('input[name="betAmount"]').val()

    const minValue = 0.00000001.toFixed(8)
    if (parseFloat(betAmount) === 0 && betAmount.length === 10) $('input[name="betAmount"]').val(minValue);
  })

  $('#multipleCoinPage div.bet-count-button').click(function(e) {
    const currentCoin = $('#homeMenu .currentCoin').text()
    const betAmount = $('#multipleCoinPage input[name="betAmount"]').val()

    let updatedBetAmount = 0;
    const buttonId = e.target.id
    switch (buttonId) {
      case 'divided2':
        updatedBetAmount = betAmount / 2
        break;
      case 'multiply2':
        updatedBetAmount = betAmount * 2
        break;
      case 'getMin':
        updatedBetAmount = 0.00000001
        break;
      case 'getMax':
        updatedBetAmount = parseFloat(currentCoin)
        break;
    }
    $('#multipleCoinPage input[name="betAmount"]').val(updatedBetAmount.toFixed(8))

    const betOdd = $('#multipleCoinPage input[name="betOdd"]').val()
    countWinProfit(updatedBetAmount, betOdd)
  })

  $('#multipleCoinPage input[name="betOdd"]').keyup(function() {
    const currentBetOdd = parseFloat($('input[name="betOdd"]').val());
    const updateWinchange = (9500 / currentBetOdd) / 100
    const betAmount = $('#multipleCoinPage input[name="betAmount"]').val()

    $('input[name="winChange"]').val(`${updateWinchange.toFixed(2)}%`)

    countWinProfit(betAmount, currentBetOdd)
  })

  $('button.submit-bet-button').click(function(e){
    const playJackpot = [];
    $.each($("input[name='jackpot']:checked"), function(){
      playJackpot.push($(this).val());
    });

    console.log('playJackpot', playJackpot);
    const postData = {
      betAmount: $('#multipleCoinPage input[name="betAmount"]').val(),
      betOdd: $('#multipleCoinPage input[name="betOdd"]').val(),
      betType: e.target.id,
      playJackpot
    }

    $.post('/multiple-coin/manualBet', postData, function( result ) {
      console.log('result', result);
      updateNumberJackpot(result.randomNumber)
    })
  })
})

function countWinProfit(betAmount, betOdd) {
  const winProfit = (betOdd - 1) * betAmount
  $('#multipleCoinPage input[name="winProfit"]').val(winProfit.toFixed(8));
}
