/**
 Initializes the vendor plugins

 **/

;(function($, undefined) {
	'use strict';

	if ($('.widg_teaser__img img').length) {
		$(window).resize(function() {
			if ($(window).width() > 1023) {
				$('.widg_teaser__img img').imageScale({
					rescaleOnResize: true,
					scale: 'best-fill',
					align: 'center'
				});
			}
		});
	}

	$(document).ready(function() {
		// The Jquery Spinner, has to be implemented when element is added later than document.ready
		$('.fhnw-spinner').spinner({
			radius: 30,
			strokeWidth: 6,
			color: '#999999'
		});

		if ($('.widg_teaser__img img').length) {
			if ($(window).width() > 1023) {
				$('.widg_teaser__img img').imageScale({
					rescaleOnResize: true,
					scale: 'best-fill',
					align: 'center'
				});
			}
		}

		function initScale(el) {
			if ($(el).data('imageScale')) {
				return;
			}
			var maxHeight = Math.min((el.naturalHeight || el.height), 526);
			$(el).parent()
				.css('height', maxHeight + 'px')
				.addClass('is-loaded');
			$(el).imageScale({
				rescaleOnResize: true,
				scale: 'best-fill',
				align: 'center'
			});
		}

		if ($('.widg_teaser__img img').length) {
			if ($(window).width() > 1023) {
				$('.widg_teaser__img img').imageScale(
					initScale(this)
				);
			}
		}

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
