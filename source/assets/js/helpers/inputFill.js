/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	$(document).ready(function() {
		$('div.input__text').find('input').on('change.fillInput', function() {
			if ($(this).val() !== '') {
				$(this).addClass('is_filled');
			} else {
				$(this).removeClass('is_filled');
			}
		});
	});
})(jQuery);
