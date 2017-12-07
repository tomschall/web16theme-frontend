/**
 Initializes the links, adds anchor link, if link is anchor link
 **/

;(function($, undefined) {
	'use strict';

	$(document).ready(function() {
		$('a').map(function(index, element) {
			var $link = $(element),
					href = $link.attr('href');

			if (typeof href !== typeof undefined) {
				if (href.charAt(0) === '#' && $link.data('carousel') !== 'link') {
					$link.addClass('anchor-link');
				}
			}
		});

		$('.anchor-link').on('click.links', function(ev) {
			ev.preventDefault();

			var $targetElement;
			var initialTabIndex;
			if ($.attr(this, 'href') !== '#') {
				$targetElement = $($.attr(this, 'href'));
				$('html, body').animate({
					scrollTop: $targetElement.offset().top - 45
				}, 250, (function() {
					window.location.hash = $.attr(this, 'href').substring(1);
				}).bind(this));
				initialTabIndex = $targetElement.prop('tabindex');
				if (initialTabIndex === -1) {
					$targetElement.prop('tabindex', 0);
				}
				$targetElement.focus();
				if (initialTabIndex === -1) {
					$targetElement.prop('tabindex', -1);
				}
			}
		});
	});
})(jQuery);
