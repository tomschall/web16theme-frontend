/**
 Initializes the vendor plugins

 **/

;(function($, undefined) {
  'use strict';

  jQuery(function() {
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
