var AYR = AYR || {};

(function(){

  // If ontouchstart exists then set click handler to touchstart otherwise set clickhandler to click
  // var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
  var last_known_scroll_position = 0;
  var ticking = false;
  var siteHeader = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var gridItem = document.querySelectorAll('.grid-item img');
  var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

  
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
      $('.grid-fluid').isotope({
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
      if(AYR.isMobile() === false) {
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

    // gridItem.addEventListener(clickHandler, function(e) { 
    //   this.parentNode.parentNode.classList.toggle('active');
    // });

    for (var i = 0; i < gridItem.length; i++) {
      gridItem[i].addEventListener(clickHandler, function(e) { 
        e.preventDefault();
        this.parentNode.parentNode.classList.toggle('active');
      }, false);
    }

    /**************************************/
    /*   Mobile Navigation Trigger
    /***************************************************/
    menuBtn.addEventListener(clickHandler, function(e) { 
      this.classList.toggle('active');
      siteNav.classList.toggle('active');
      siteHeader.classList.toggle('mobile-active');
    });

     
    }, // end init

    isMobile: function(){
      var maxWidth = 768
        , iPadDevice = null != navigator.userAgent.match(/iPad/i)
        , w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return w < maxWidth || iPadDevice ? !0 : !1
    }
  } // end AYR

})();

AYR.init();