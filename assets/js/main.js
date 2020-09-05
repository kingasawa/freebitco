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


  $(".buttonOnEvent").click(function(){
    $(this).toggleClass("active");
  })

  $('.menu-open').click(function() {
    $('.ui.sidebar')
      .sidebar('toggle');
  })




  // eslint-disable-next-line no-undef
  $('form#login').submit(function(e){
    e.preventDefault();
    console.log('submit xxx');
  });

});
