"use strict";

var AYR = AYR || {};

(function(){

  let last_known_scroll_position = 0;
  let ticking = false;
  let siteHeader = document.querySelector('.site-header');
  let menuBtn = document.querySelector('.menu-btn');
  let siteNav = document.querySelector('.site-nav');
  let topTrigger = $('.top-trigger');
  let gridTrigger = $('.grid-trigger');
  let gridNav = $('.grid-nav');
  let gridItem = document.querySelectorAll('.grid-item img');

  // If ontouchstart exists then set click handler to touchstart otherwise set clickhandler to click
  let clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

  
  AYR = {

    init: function() {

    $(window).trigger('resize');

    // filter items on button click
    $('.site-footer').on( 'click', '.top-trigger', function() {
      AYR.scrollTop(0);
    });

    $('.grid-fluid').imagesLoaded( function() {

      /**************************************/
      /*   Grid Navigation Trigger
      /***************************************************/
      // init Isotope
      let $grid = $('.grid-fluid').isotope({
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
      $(document).on( 'click', '[data-filter]', function() {
        console.log('tt');
        AYR.scrollTop(300);
        let filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      $( window ).resize(function() {
        $('.grid-fluid').isotope({
        // update columnWidth to a percentage of container width
        // masonry: { columnWidth: $('.grid-fluid').width() / 3 }
        masonry: { columnWidth: '.grid-sizer' }
        });
      });

    });


    

    /**************************************/
    /*   Window Scroll
    /***************************************************/
    // Reference: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

    var doSomething = (scroll_pos) => {
    // function doSomething(scroll_pos) {
      // if(AYR.isMobile() === false) {

        
        if(last_known_scroll_position >= 100 ){
          siteHeader.classList.add('small');
          topTrigger.addClass('active');
        }
        
        if(last_known_scroll_position >= 200 ) {
          gridNav.addClass('active');
        } 
        
        if(last_known_scroll_position < 100 ){
          siteHeader.classList.remove('small');
          topTrigger.removeClass('active');
        }

        if(last_known_scroll_position < 200 ){
          gridNav.removeClass('active');
        }
      // }
    }

    window.addEventListener('scroll', function(e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      last_known_scroll_position = scrollTop;
      console.log('scrollpos: ', last_known_scroll_position);
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

    for (let i = 0; i < gridItem.length; i++) {
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
      let maxWidth = 768
        , iPadDevice = null != navigator.userAgent.match(/iPad/i)
        , w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return w < maxWidth || iPadDevice ? !0 : !1
    },

    scrollTop: function(topOffset) {
      console.log('************** scrollTop fired *****************');
      $('html,body').animate({
          scrollTop: $('html,body').offset().top  + topOffset
      }, 1000);
    }
  } // end AYR

})();

AYR.init();