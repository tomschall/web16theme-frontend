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

		$('.widg_teaser__img img').imageScale({
			rescaleOnResize: true,
			scale: 'best-fill'
		});

		$('.widg_hero__img:not(.is-profile-hero)').imageScale({
			rescaleOnResize: true,
			scale: 'best-fill',
			align: 'top'
		});

		$('.widg_teaser__img img').imageScale('scale');

		$('.search__form-wrapper').scrollToFixed();
	});

	$(window).load(function() {
		$('.custom-scrollbar, .widg_navigation__sub-wrapper').mCustomScrollbar({
			theme: 'fhnw'
		});
	});
})(jQuery);
