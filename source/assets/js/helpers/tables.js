/*!
 * table hack
 *
 * @author Not Me, ask the Product Owners
 * @copyright FHNW Brugg/Windisch
 *
*/
'use strict';

;(function($, document, undefined) {

	document.addEventListener('DOMContentLoaded', function() {

		$('table.content__table').each(function() {
			var isStyle = 0;
			$(this).children('tbody').children('tr').each(function() {
				$(this).children('td').each(function() {
					if ($(this).attr('style')) {
						isStyle += 1;
					}
				});

			});
			if (isStyle === 0) {
				$(this).removeClass('content__table').addClass('content__table__backcomp');
			}
		});
	});

	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('table').on('touchstart, ontouchstart', function() {
			$(this).addClass('touched, mobile__scroll');
		});	
	}
	
	$('table').on('scroll click', function() {
		$(this).addClass('scrolling');
	});

	// REMOVE SCROLL ICON IF TABLE IS NOT SCROLLABLE AND SMALLER THAN CONTENT COLUMN
	// webteam/fhnw.webauftritt#1580
	$('table tbody').each(function() {
		var tableWidth = $(this).outerWidth();
		var contentElem = document.querySelector('.content__element');
		var rectContentElement = contentElem.getBoundingClientRect();
		var contentWidth = rectContentElement.width;
		console.log(tableWidth, contentWidth);
		if (tableWidth < contentWidth) {
				$(this).parent().removeClass('scrolling, mobile__scroll');
		} else {
			$(this).parent().addClass('scrolling, mobile__scroll');
		}
 });

})(jQuery, document);