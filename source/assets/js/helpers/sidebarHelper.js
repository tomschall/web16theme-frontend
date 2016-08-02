/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	/*jshint ignore:start*/
	$('.product_sidebar').stick_in_parent({
		offset_top: 10
	});

	$('.product_sidebar_v3 a.anchor-link').on('click.' + 'sidebarHelper', function(event) {
		event.preventDefault();

		var _scrollTop = $($(event.target).attr('href')).offset().top;

		$('html, body').animate({
			scrollTop: _scrollTop - 150
		}, 750);
	});
	/*jshint ignore:end*/
})(jQuery);
