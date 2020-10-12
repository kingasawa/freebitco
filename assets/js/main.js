
$(function() {

  $(document).ready(function() {
    const pathName = window.location.pathname
    console.log('pathName', pathName);
    $('.item').each(function() {
      if ($(this).attr('href') === pathName) {
        $(this).addClass('active')
      }
    })
  });

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

  const btcAddress = $('#btc-address').text()
  console.log('btcAddress', btcAddress);
  $('#btc-qr-code-canvas').qrcode({width: 64,height: 64,text: btcAddress});


});
