/**
 Initializes the vendor plugins

 **/

;(function($, undefined) {
	'use strict';

	$(document).ready(function() {
		/**
		 * The Jquery Spinner, has to be implemented when element is added later than document.ready
		 */
		$('.fhnw-spinner').spinner({
			radius: 30,
			strokeWidth: 6,
			color: '#999999'
		});

		$('.widg_hero__img, .widg_teaser__img img').imageScale({
			rescaleOnResize: true,
			scale: 'best-fill'
		});

		$('.widg_teaser__img img').imageScale('scale');
	});

	$(window).load(function() {
		$('.custom-scrollbar').mCustomScrollbar({
			theme: 'fhnw'
		});
	});
})(jQuery);
