//var submitbtn = document.getElementById("submit");

window.onload = function() {
  initFirebase();
};

function initVideo() {
  var playbackId = "YOUR_PLAYBACK_ID";
      ///var url = "https://stream.mux.com/n7k02zC6ghprVBZ9n3Fc6nwhrKHKaz9Z02.m3u8";

      var url = "https://stream.mux.com/ZVSZ5V9XlbdxNvy8OpIipEVxU46eSyiK.m3u8"; //this is the new stream

      // HLS.js-specific setup code
      if (Hls.isSupported()) {
        var video = document.getElementById("myVideo");
        var hls = new Hls({
          liveSyncDuration: 2,
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        video.addEventListener('canplaythrough', function () {
          var promise = video.play();
          if (promise !== undefined) {
            promise.catch(function(error) {
              console.error('Auto-play was prevented');
              console.error('We Show a UI element to let the user manually start playback');
              buttonPlay.style.display = 'block';
            }).then(function() {
              console.info('Auto-play started');
              buttonPlay.style.display = 'none';
            });
          }
        }); 

        video.muted = 'muted';
        video.autoplay = 'autoplay';
        video.playsinline = 'true';

      
        //window.alert(video);
      }
    }

function initFirebase() {
  var ifOnline = firebase.database().ref('Drone/Buster3/isOnline');
  var destinationName = document.getElementById("DESTINATION");
  var scriptName = document.getElementById("SCRIPT");
  ifOnline.on('value', function(snap) {
  //mainText.value(snap.val().text);
    var liveStream = document.getElementById("myVideo");
    var offlineImage = document.getElementById("offlinePNG");
    // if (snap.val() == false) {
    if (false) {
      //window.alert(snap.val());
      try {
        //window.alert(liveStream.duration);
        liveStream.style.display = "none";
        offlineImage.style.display = "block";
        scriptName.style.display = "none";
      } catch (err) {
        window.alert(err);
      }
    } else {
      offlineImage.style.display = "none";
      liveStream.style.display = "block";
      scriptName.style.display = "block";
      initVideo();
    }
  
  });
  var isRestart = firebase.database().ref('Drone/Buster3/restartWebsite/restartWebsite');
  isRestart.on('value', function(snap2) {
      if (snap2.val()==true) {
        var database = firebase.database();
        database.ref('Drone/Buster3/restartWebsite').set({
          restartWebsite:false
        });
        location.reload();
      }
  });
  try {
    var destNameChanger = firebase.database().ref('Drone/Buster3');
    destNameChanger.on('value', function(snap3) {
      try {
          if (snap3.child("destinationName").val()!=null) {
            //window.alert(snap3.child("destinationName"));
            destinationName.innerHTML = snap3.child("destinationName").val();
          } else {
            destinationName.innerHTML = "Nowhere";
          }
        } catch (err) {
          //window.alert(err);
        }
    });
  } catch (err2) {
    //window.alert(err2);
  }
}

function submitClick() {
  // var database = firebase.database();
  // database.ref('asdfasdf').set({
  //   username: "ddd55edd",
  //   email: "email",
  //   profile_picture : "imageUrl"
  // });
  //location.reload();
  //mainText.innerHTML = "newtext";
  //window.alert("Working");
  var video = document.getElementById("myVideo");
  var didPlay = false;
  //while (!didPlay) {
  try {
    var dur = video.duration;
    video.currentTime = dur - 2;
    //window.alert(dur);
    didPlay = true;
  } catch (err) {
    window.alert(err);
  }
  //}

  
}

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
