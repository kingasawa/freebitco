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


  console.log('moment', moment().format());
  // $('.context.example .ui.sidebar')
  //   .sidebar({
  //     context: $('.context.example .bottom.segment')
  //   })
  //   .sidebar('attach events', '.context.example .menu .item')
  // ;

  // $('.demo.sidebar')
  //   .sidebar('setting', 'transition', 'overlay')
  //   .sidebar('toggle')
  // ;

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
