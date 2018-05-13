var AYR = AYR || {};

(function(){

  // If ontouchstart exists then set click handler to touchstart otherwise set clickhandler to click
  // var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
  var last_known_scroll_position = 0;
  var ticking = false;
  
  AYR = {

    init: function() {

    $(window).trigger('resize');


    /**************************************/
    /*   Grid Navigation Trigger
    /***************************************************/
    // init Isotope
    var $grid = $('.grid-fluid').isotope({
      // options
    });

    $('.grid-fluid').isotope({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '.grid-sizer'
      }
    })

    // filter items on button click
    $('.grid-nav').on( 'click', 'button', function() {
      console.log('tt');
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

    $( window ).resize(function() {
      $('.grid').isotope({
      // update columnWidth to a percentage of container width
      masonry: { columnWidth: $('.grid').width() / 4 }
      });
    });

    /**************************************/
    /*   Window Scroll
    /***************************************************/
    // Reference: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

    function doSomething(scroll_pos) {
      if(ayrApi.isMobile() === false) {
        if(last_known_scroll_position >= 100 ){
          siteHeader.classList.add('small');
        }else{
          siteHeader.classList.remove('small');
        }
      }
    }

    window.addEventListener('scroll', function(e) {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      last_known_scroll_position = scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          doSomething(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    });

     
    }// end init

  
  } // end AYR

})();

AYR.init();