/*!
 * table hack
 *
 * @author TeamWeb FHNW
 * @copyright FHNW Brugg/Windisch
 *
*/
'use strict';

;(function($, document, undefined) {

	document.addEventListener('DOMContentLoaded', function() {
		
		// FIRST, EXCLUDE DATAPICKER
		if (!($('.datepicker').length)) {

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

			if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				$('table').on('touchstart, ontouchstart', function() {
					$(this).addClass('touched mobile__scroll');
				});
			}

			$('table').on('scroll click', function() {
				$(this).addClass('scroll');
			});

			// REMOVE SCROLL ICON IF TABLE IS NOT SCROLLABLE AND SMALLER THAN CONTENT COLUMN
			// webteam/fhnw.webauftritt#1580
			
			$('.page_content table tbody').each(function() {
				var tableWidth = $(this).outerWidth();
				var contentElem = document.querySelector('.page_content');
				var rectContentElement = contentElem.getBoundingClientRect();
				var contentWidth = rectContentElement.width;

				if (tableWidth < contentWidth) {
					$(this).parent().addClass('scroll');
				}
				if (tableWidth > contentWidth) {
					$(this).parent().removeClass('scroll');
				}
			});

			$('.widg_accordeon__content > table tbody, .content__entry-wrapper > table tbody').each(function() {
				var tableWidth = $(this).outerWidth();
				var contentElem = document.querySelector('.widg_accordeon__content');
				var rectContentElement = contentElem.getBoundingClientRect();
				var contentWidth = rectContentElement.width;

				if (tableWidth < contentWidth) {
					$(this).parent().addClass('scroll');
				}
				if (tableWidth > contentWidth) {
					$(this).parent().removeClass('scroll');
				}
			});
		}
	});

})(jQuery, document);
