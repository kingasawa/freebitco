
$(function() {

  $("button#paymentDeposit").click(function(){
    $('#depositModal')
      .modal('show')
    ;
  })

  $("button#paymentWithdraw").click(function(){
    $('#withdrawModal')
      .modal('show')
    ;
  })

  // const canvas = document.getElementById('btc-qr-code-canvas')

  const btcAddress = $('#btc-address').text()
  console.log('btcAddress', btcAddress);
  $('#btc-qr-code-canvas').qrcode({width: 64,height: 64,text: btcAddress});

});
