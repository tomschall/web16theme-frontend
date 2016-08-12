/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	/**
	 * Checks the active selection for the last visible to add ('...') or for the last over all to remove the comma
	 * @param $select2
   */
	function checkSelection($select2) {
		var $selections = $select2.find('.select2-selection__choice'),
				selectionWidth = $select2.find('.select2-selection__rendered').width(),
				elementsWidth = 0,
				indexNotVisible = -1;

		$selections.removeClass('showEtc hideComma');

		$selections.each(function(index, element) {
			elementsWidth += $(element).outerWidth();

			if (elementsWidth > selectionWidth && indexNotVisible === -1) {
				$($selections.get(index - 1)).addClass('showEtc');

				indexNotVisible = index;
			}
		});

		if (indexNotVisible === -1) {
			$selections.last().addClass('hideComma');
		}
	}

	/**
	 * Initializes the text input fields
	 */
	function initTextInputFields() {
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

		$('.reset-field').on('click.formElementHelper', function() {
			$(this).prevAll('input').val('').trigger('change.fillInput');
		});
	}

	/**
	 * Initializes the select2 dropdowns
	 */
	function initSelect2() {
		var $selectFields = $('.custom-select');

		$selectFields.select2();

		$selectFields.on('change.formElementHelper', function(event) {
			var $select = $(event.target),
					$select2 = $select.nextAll('.select2-container');

			if ($select.val() === null || $select.val() === '') {
				$select2.removeClass('has-selection');
				$select2.nextAll('.custom-select___remover').hide();
			} else {
				$select2.addClass('has-selection');
				$select2.nextAll('.custom-select___remover').show();

				checkSelection($select2);
			}
		});

		$selectFields.on('select2:open.formElementHelper', function() {
			setTimeout(function() {
				$('.select2-results__options').mCustomScrollbar({
					theme: 'fhnw',
					advanced: {
						updateOnContentResize: true
					}
				});
			}, 200);
		});

		$('.custom-select___remover').on('click.formElementHelper', function() {
			$(this).prevAll('select').val('').trigger('change');
		});
	}

	/**
	 * Extends the validators
	 */
	function extendValidator() {
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
	}

	$(document).ready(function() {

		initTextInputFields();

		initSelect2();

		extendValidator();
	});
})(jQuery);
