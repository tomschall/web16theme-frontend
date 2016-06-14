/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
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

		$('.custom-select').select2({
			minimumResultsForSearch: Infinity
		});

		$('form[data-validate="true"]').validate({
			onfocusout: function(element) {
				$(element).valid();
			},

			errorPlacement: function(error, element) {
				if ($(element).is('select')) {
					error.insertAfter($(element).next('.select2'));
				} else {
					error.appendTo($(element).closest('div'));
				}
			}
		});

		/**
		 * Adding additional validator methods
		 */
		$.validator.addMethod('selectRequired', function(value) {
			return value !== '';
		});
	});
})(jQuery);
