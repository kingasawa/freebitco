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

  // $('.menu-open').click(function() {
  //   $('.ui.sidebar')
  //     .sidebar('toggle');
  // })


  // eslint-disable-next-line no-undef
  $('form#login').submit(function(e){
    e.preventDefault();
    console.log('submit xxx');
  });

});

function noty(data) {
  let options = {
    type: 'warning',
    layout: 'topRight', //top
    theme: 'mint',// bootstrap-v3
    text: 'msg',
    timeout: 3000,
    // progressBar: true,
    // closeWith: ['click', 'button'],
    animation: {
      open: 'noty_effects_open',
      close: 'noty_effects_close'
    },
    id: false,
    force: false,
    killer: false,
    queue: 'global',
    container: false,
    buttons: [],
    // sounds: {
    //   sources: [],
    //   volume: 1,
    //   conditions: []
    // },
    // titleCount: {
    //   conditions: []
    // },
    modal: false
  };

  options.text = data.text;
  if(data.type)
    options.type = data.type;
  if(data.layout)
    options.layout = data.layout;
  new Noty(options).show();
}
