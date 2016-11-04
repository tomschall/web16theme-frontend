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

			if ($.attr(this, 'href') !== '#') {
				$('html, body').animate({
					scrollTop: $($.attr(this, 'href')).offset().top - 45
				}, 250);
			}
		});
	});
})(jQuery);
