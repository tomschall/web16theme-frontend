/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var eventsSet = false,
			stateClasses = {
				isFilled: 'is_filled',
				isFocused: 'is_focused'
			},
			validationMapping = {
				'required': {
					ruleName: 'required',
					initialValue: true
				},
				'selectRequired': {
					ruleName: 'selectRequired',
					initialValue: true
				},
				'selectMultipleRequired': {
					ruleName: 'selectMultipleRequired',
					initialValue: true
				},
				'email': {
					ruleName: 'email',
					initialValue: true
				}
			};

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
		var $textInputFields = $('.ArchetypesStringWidget, .search__string').find('input[type="text"], input[type="password"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], input[type="number"], textarea');

		/**
		 * Event when text input fields are changed
		 */
		$textInputFields.on('change.fillInput', function() {
			var $inputField = $(this),
					$parentField = $inputField.parent('.field');

			if ($inputField.val() !== '') {
				$inputField.addClass(stateClasses.isFilled);
				$parentField.addClass(stateClasses.isFilled);
			} else {
				$inputField.removeClass(stateClasses.isFilled);
				$parentField.removeClass(stateClasses.isFilled);
			}
		});

		$textInputFields.on('focus.formElementHelper', function() {
			var $inputField = $(this),
					$parentField = $inputField.parent('.field');

			$inputField.addClass(stateClasses.isFocused);
			$parentField.addClass(stateClasses.isFocused);
		});

		$textInputFields.on('blur.formElementHelper', function() {
			var $inputField = $(this),
					$parentField = $inputField.parent('.field');

			$inputField.removeClass(stateClasses.isFocused);
			$parentField.removeClass(stateClasses.isFocused);
		});

		// EasyForm Move span class form Help
		var $easyFormFields = $('.field');

		$easyFormFields.each(function() {
			var $formHelp = $(this).find('.formHelp');

			if ($formHelp.length === 1) {
				$formHelp.clone().appendTo($(this));
			}
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
		var $selectFields = $('.custom-select, .select-widget, .field select'),
				$relatedLabels = $selectFields.siblings('label, .label');

		$selectFields.on('change.formElementHelper', function(event) {
			var $select = $(event.target),
					$select2 = $select.nextAll('.select2-container'),
					$field = null;

			if ($select.closest('.field').length > 0) {
				$field = $select.closest('.field');
			}

			if ($select.val() === null || $select.val() === '') {
				$select2.removeClass('has-selection');
				$select2.nextAll('.custom-select___remover').hide();
				$select.removeClass('has-value');

				if ($field !== null) {
					$field.removeClass('has-value');
				}

			} else {
				$select2.addClass('has-selection');
				$select2.nextAll('.custom-select___remover').show();
				$select.addClass('has-value');

				if ($field !== null) {
					$field.addClass('has-value');
				}

				checkSelection($select2);
			}
		});

		$selectFields.on('select2:open.formElementHelper', function() {
			// Options are not initialized immediately, so we wait 100 millisec
			setTimeout(function() {
				var $select2ResultsOptions = $('.select2-results__options');

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

		$relatedLabels.on('mouseover.formElementHelper', function() {

			$(this).parent('div').addClass('has-focused-label');
		});

		$relatedLabels.on('click.formElementHelper', function() {
			var $select = $(this).siblings('select');

			if ($(this).siblings('.select2-container--open').length === 0) {
				$select.select2('open');
			}
		});

		$relatedLabels.on('mouseout.formElementHelper', function() {
			$(this).parent('div').removeClass('has-focused-label');
		});

		eventsSet = true;
	}

	/**
	 * Initializes the select2 dropdowns
	 */
	function initSelect2() {
		var $selectFields = $('.custom-select, .select-widget, .field select');

		$selectFields.map(function(index, select) {
			if ($(select).hasClass('has_optgroup')) {
				initOptgroups($(select));
			}
		});

		$selectFields.select2({
			minimumResultsForSearch: 25
		});

		$selectFields.map(function(index, select) {
			var $select = $(select),
					$select2 = $(select).nextAll('.select2-container'),
					$field = $select.parent('.field');

			if ($field.length > 0) {
				$field.addClass('has-select');

				if (typeof $select.attr('multiple') !== typeof undefined) {
					$field.addClass('has-multiple-select');
				}
			}

			if (!$select.hasClass('has-value')) {
				$select2.removeClass('has-selection');
				$select2.nextAll('.custom-select___remover').hide();
			} else {
				$select2.addClass('has-selection');
				$select2.nextAll('.custom-select___remover').show();

				if ($select.not('.custom-select__long')) {
					checkSelection($select2);
				}
			}

			/* var options = $select[0].options,
					tempArray = [];

			for(var i = 0; i < options.length; i++) {
				tempArray.push({
					optionLabel: options[i].text,
					optionValue: options[i].value
				});

				console.log(tempArray);
			} */
		});

		if (!eventsSet) {
			addSelect2Events();
		}
	}

	/**
	 * Extends the validators
	 */
	function extendValidator() {
		$('.form form').each(function(formIdx, form) {
			var $form = $(form),
					rules = {},
					messages = {};

			$form.find('.field').each(function(fieldIdx, field) {
				var $field = $(field),
						temprules = {},
						tempmessages = {};

				$field.find('span').each(function(spanIdx, span) {
					var $span = $(span),
							classList = $span.attr('class').split(/\s+/);

					classList.forEach(function(className) {

						if (className === 'required' && $field.hasClass('has-select')) {
							className = 'selectRequired';

							if (typeof $field.find('select').attr('multiple') !== typeof undefined) {
								className = 'selectMultipleRequired';
							}
						}

						if (validationMapping[className]) {
							if (typeof validationMapping[className].initialValue === 'function') {
								temprules[validationMapping[className].ruleName] = validationMapping[className].initialValue();
							} else {
								temprules[validationMapping[className].ruleName] = validationMapping[className].initialValue;
							}

							tempmessages[validationMapping[className].ruleName] = $span.attr('title');
						}
					});
				});

				if (temprules !== {}) {
					rules[$field.find('input, textarea, select').attr('name')] = temprules;
					messages[$field.find('input, textarea, select').attr('name')] = tempmessages;
				}
			});

			$form.validate({
				onfocusout: function(element) {
					$(element).siblings('.fieldErrorBox').empty();
					$(element).closest('.field').removeClass('error');
					$(element).closest('.field').find('.fieldErrorBox').empty();

					$(element).valid();
				},

				rules: rules,
				messages: messages,
				ignore: [],
				errorPlacement: function(error, element) {
					$(element).siblings('.fieldErrorBox').empty();
					$(element).closest('.field').addClass('error');
					$(element).closest('.field').find('.fieldErrorBox').empty();

					if ($(element).is('select')) {
						$(element).siblings('.fieldErrorBox').text(error.text());
					} else if ($(element).is('input[type="radio"]') || $(element).is('input[type="check"]') || $(element).is('input[type="checkbox"]')) {
						$(element).closest('.field').addClass('error');
						$(element).closest('.field').find('.fieldErrorBox').text(error.text());

						return true;
					} else {
						$(element).siblings('.fieldErrorBox').text(error.text());
					}
				}
			});
		});

		/**
		 * Adding additional validator methods
		 */
		$.validator.addMethod('selectRequired', function(value) {
			return value !== '--NOVALUE--';
		});

		$.validator.addMethod('selectMultipleRequired', function(value) {
			return value !== null;
		});
	}

	function initTextAreas() {
		$('form textarea').each(function(txtAreaIdx, txtArea) {
			var $txtArea = $(txtArea),
					txtAreaHeight = $txtArea.outerHeight(),
					$txtAreaParent = $txtArea.parent('.field');

			$txtAreaParent.css({
				'min-height': txtAreaHeight
			});
		});
	}

	function initRadios() {
		$('input[type="radio"]').each(function(radioIdx, radio) {
			var $radio = $(radio);

			$radio.closest('.field').addClass('has-radio');
		});
	}

	function initFileupload() {
		$('input[type="file"]').each(function(fileIdx, file) {
			var $file = $(file);

			$file.closest('.field').addClass('has-upload');
		});
	}

	$(document).ready(function() {

		initTextInputFields();
		initRadios();
		initSelect2();
		extendValidator();
		initFileupload();

		initTextAreas();
	});

	/**
	 * Save to global Namespace
	 */
	$.extend(true, estatico, {
		formElementHelper: {
			initSelect2: initSelect2
		}
	});
})(jQuery);
