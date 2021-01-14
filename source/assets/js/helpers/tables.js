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
				$(this).removeClass('content__table').addClass('content__table__backcomp  scrolling mobile__scroll');
			}
		});
	});

	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('table tbody').each(function() {
			$('table, table.table_striped').on('touchstart, ontouchstart', function() {
				console.log('accoredeon table triggered');
				$(this).addClass('touched mobile__scroll');
			});
		});
	}
	
	$('table').on('scroll click', function() {
		console.log('accoredeon table triggered');
		$(this).removeClass('mobile__scroll');
	});

	// REMOVE SCROLL ICON IF TABLE IS NOT SCROLLABLE AND SMALLER THAN CONTENT COLUMN
	// webteam/fhnw.webauftritt#1580
	$('table tbody').each(function() {
		var tableWidth = $(this).outerWidth();
		var contentElem = document.querySelector('.content__element, .content__table__backcomp');
		var rectContentElement = contentElem.getBoundingClientRect();
		var contentWidth = rectContentElement.width;

		console.log(tableWidth, contentWidth);

		if (tableWidth < contentWidth) {
			$(this).parent().removeClass('scrolling mobile__scroll');
		} else {
			$(this).parent().addClass('scrolling mobile__scroll');
		}
 	});

})(jQuery, document);