/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	$(document).ready(function() {

		var $textInputFields = $('.ArchetypesStringWidget, .search__string').find('input');

		/**
		 * Event when text input fields are changed
		 */
		$textInputFields.on('change.fillInput', function() {
			if ($(this).val() !== '') {
				$(this).addClass('is_filled');
			} else {
				$(this).removeClass('is_filled');
			}
		});

		$('.custom-select').select2({
			minimumResultsForSearch: Infinity
		});

		$('.reset-field').on('click.formElementHelper', function() {
			$(this).prevAll('input').val('').trigger('change.fillInput');
		});

		$('form[data-validate="true"]').validate({
			onfocusout: function(element) {
				$(element).valid();
			},

			ignore: [],
			errorPlacement: function(error, element) {

				if ($(element).is('select')) {
					return true;
				} else if ($(element).is('input[type="radio"]') || $(element).is('input[type="check"]') || $(element).is('input[type="checkbox"]')) {
					return true;
				} else {
					console.log($(element));
					console.log($(element).siblings('.fieldErrorBox'));
					$(element).siblings('.fieldErrorBox').text(error.text());
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
