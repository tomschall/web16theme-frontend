/**
 Initializes the vendor plugins

 **/

;(function($, undefined) {
  'use strict';

  jQuery(function() {
    var scale = function(el) {
      $(el).imageScale({
        rescaleOnResize: true,
        scale: 'best-fill',
        align: 'center'
      });
    };

    if ($('.widg_teaser__img img').length) {
      $(window).on('resize', function() {
        if ($(window).width() > 1023) {
          scale($('.widg_teaser__img img'));
        }
      });
      scale($('.widg_teaser__img img'));
    }

		// The Jquery Spinner, has to be implemented when element is added later than document.ready
		$('.fhnw-spinner').spinner({
			radius: 30,
			strokeWidth: 6,
			color: '#999999'
		});

		if (window.estatico.mq.query({from: 'subnav'})) {
			$('.search__form-wrapper').scrollToFixed();
		}
	});

	$(window).load(function() {
		$('.custom-scrollbar, .widg_navigation__sub-wrapper').mCustomScrollbar({
			theme: 'fhnw'
		});
	});
})(jQuery);
