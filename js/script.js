var AYR = AYR || {};

(function(){

  // If ontouchstart exists then set click handler to touchstart otherwise set clickhandler to click
  // var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

  AYR = {

    init: function() {

    $(window).trigger('resize');


     /**************************************/
      /*   Grid Navigation Trigger
      /***************************************************/
      // init Isotope
      var $grid = $('.grid').isotope({
        // options
      });
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

      

      // $(window).smartresize(function(){
      //   $('.grid').isotope({
      //   // update columnWidth to a percentage of container width
      //   masonry: { columnWidth: $('.grid').width() / 4 }
      // })();

     
    }// end init

  
  } // end AYR

})();

AYR.init();