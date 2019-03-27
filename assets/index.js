function toggleNav() {
  if ($('#nav-icon3').hasClass("open")) {
    $(".sidenav").removeClass('expanded');
  } else {
    $(".sidenav").addClass('expanded');
  }
  $('#nav-icon3').toggleClass('open');
  $('#menu').toggleClass('open');
}

 function toggleLights() {
   $('h1, h2, h3, h4, p, .logo-font, #nav-icon3 span').toggleClass('back');

   $('.section, body, .container, .fire, .sidenav, .sidenav a, .section::-webkit-scrollbar-thumb, .placeholder, .gray, .member, .column, .header-wrap, #drone_dark, #drone_light, .logo, .shade, .add_background, .expanded').toggleClass('light');
 }

 function testing() {
   console.log($(this))
   var section = $(this).attr('href').substr(1);
   console.log(section);
   $('#mission').toggleClass('show');
 }

 function closeSide() {
   if ($(window).width() < 700) {
     $(".sidenav").removeClass('expanded');
     $('#nav-icon3').toggleClass('open');
   }
 }

$(document).ready(function(){
  $(window).scroll(function() {
      var scroll = $(window).scrollTop(); // how many pixels you've scrolled
      var os = $('#home').offset().top; // pixels to the top of div1
      var ht = $('#home').height(); // height of div1 in pixels
      // if you've scrolled further than the top of div1 plus it's height
      // change the color. either by adding a class or setting a css property
      if(scroll > os + ht){
        $('#header').addClass('add_background');
      } else {
        $('#header').removeClass('add_background');
      }
  });
});

 $(document).ready(function(){
   $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
 });
