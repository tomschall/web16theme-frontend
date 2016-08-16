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

	function initOptgroups($field) {
		var $options = $field.find('option'),
				currentChar = '',
				counter = 0;

		if ($field.find('optgroup').length > 1) {
			$field.find('optgroup').remove();
		}

		$options.map(function(index, element) {
			if ($(element).attr('disabled') !== 'disabled' && $(element).attr('value') !== '') {
				var firstChar = $(element).text().slice(0, 1).toLowerCase();

				// New Char, have to close optgroup, except if counter is on 0
				if (firstChar !== currentChar) {
					var optgroupString = '';

					if (counter > 0) {
						optgroupString = optgroupString + '</optgroup>';
					}

					optgroupString = optgroupString + '<optgroup label="' + firstChar.toUpperCase() + '">';

					$(element).before(optgroupString);
				}

				currentChar = firstChar;
			}

			if (counter === ($options.length - 1)) {
				$(element).before('</optgroup>');
			}

			counter++;

		});
	}

	function addSelect2Events() {
		var $selectFields = $('.custom-select');

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
			// Options are not initialized immediately, so we wait 100 millisec
			setTimeout(function() {
				var $select2ResultsOptions = $('.select2-results__options');

				$select2ResultsOptions.mCustomScrollbar({
					theme: 'fhnw',
					advanced: {
						updateOnContentResize: true
					}
				});

				if ($select2ResultsOptions.find('[role="group"]').length > 0) {
					$select2ResultsOptions.addClass('has_groups');
				}
			}, 1);
		});

		$selectFields.on('select2:closing.formElementHelper', function() {
			$('.select2-results__options').mCustomScrollbar('destroy');
		});

		$('.custom-select___remover').on('click.formElementHelper', function() {
			$(this).prevAll('select').val('').trigger('change');
		});
	}

	/**
	 * Initializes the select2 dropdowns
	 */
	function initSelect2() {
		var $selectFields = $('.custom-select');

		$selectFields.map(function(index, select) {
			if ($(select).hasClass('has_optgroup')) {
				initOptgroups($(select));
			}
		});

		$selectFields.select2();

		$selectFields.map(function(index, select) {
			var $select = $(select),
					$select2 = $(select).nextAll('.select2-container');

			if ($select.val() === null || $select.val() === '') {
				$select2.removeClass('has-selection');
				$select2.nextAll('.custom-select___remover').hide();
			} else {
				$select2.addClass('has-selection');
				$select2.nextAll('.custom-select___remover').show();

				checkSelection($select2);
			}
		});

		addSelect2Events();
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

	/**
	 * Save to global Namespace
	 */
	$.extend(true, estatico, {
		formElementHelper: {
			initSelect2: initSelect2,
			addSelect2Events: addSelect2Events
		}
	});
})(jQuery);
