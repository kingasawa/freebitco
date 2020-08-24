$(function() {

  $('select.dropdown')
    .dropdown();

  $('.menu .item')
    .tab();

  $('.inline.icon')
    .popup({
      inline: true
    })
  ;

  // eslint-disable-next-line no-undef
  $('form#login').submit(function(e){
    e.preventDefault();
    console.log('submit xxx');
  });

});
