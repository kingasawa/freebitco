$(function() {

  // eslint-disable-next-line no-undef
  $('#freeBitcoinPage button#submitRoll').click(function(e){
    e.preventDefault();
    console.log('e.value', e.value);
    $.post('/free', ( data ) => {
      console.log('data', data);
    });
  });
});
