/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var rules,
	$thisform = '#' + $('form').attr('id'),
	easyFormValidation = {

		rules: {
			$form: $thisform,
			$formSelect: $($thisform + ' select'),
			$formCheckbox: $($thisform + ' input:checkbox'),
			$formRadio: $($thisform + ' input:radio'),
			required: 'required',
			error: 'error',
			$fieldErrorBox: $('.fieldErrorBox'),
			$formSubmitButton: $('#form-buttons-submit'),
			$formResetButton: $('#form-buttons-reset'),
			formSubmitButtonText: $('#form-buttons-submit').val(),
			formSubmitButtonErrorText_A: 'Das Formular enhält Fehler.',
			removeChoice: 'select2-selection__choice',
			optionSelected: 'selected',
			optionNoValue: '--NOVALUE--',
			optionListSelector: 'ul.select2-selection__rendered',
			$optionSelectionchoice: $('ul.select2-selection__rendered').find('li.select2-selection__choice'),
			$onOptionDropdownSelector: $('span.select2-selection__rendered')
		},

		init: function() {
			rules = this.rules;

			easyFormValidation.setup();
			easyFormValidation.fieldRadioService();
			easyFormValidation.select2Init();
			easyFormValidation.addSelect2SelectionID();
			easyFormValidation.onInput();
			easyFormValidation.onOptionDropdown();
			easyFormValidation.onOptionMultiSelect();
			easyFormValidation.resetForm();
			easyFormValidation.formSubmitState();
		},

		selectorFieldRules: {
			addErrorClass: function($selectedElementID) {
				$($selectedElementID).parent().addClass(rules.error);
			},

			removeErrorClass: function($selectedElementID) {
				$($selectedElementID).parent().removeClass(rules.error);
			},

			addErrorMessage: function($selectedElementID, $errorMsg) {
				$($selectedElementID).prev().text($errorMsg);
			},

			removeErrorMessage: function($selectedElementID, $errorMsg) {
				$($selectedElementID).prev().text($errorMsg);
			},

			addCheckboxErrorClass: function($selectedElementID) {
				$($selectedElementID).parent().parent().addClass(rules.error);
			},

			removeCheckboxErrorClass: function($selectedElementID) {
				$($selectedElementID).parent().parent().removeClass(rules.error);
			},

			addOptionErrorClass: function($selectedElementID) {
				$($selectedElementID).addClass(rules.error);
			},

			removeOptionErrorClass: function($selectedElementID) {
				$($selectedElementID).removeClass(rules.error);
			},

			getSelectOptionID: function($selectedElementID) {
				var $getOptionID = '#' + $('#' + $selectedElementID).parent().parent().prev().attr('id');

				return $getOptionID;
			},

			getSelectOptionDropdownID: function($selectedElementID) {
				var $getOptionID = '#' + $('#' + $selectedElementID).parent().parent().parent().prev().attr('id');

				return $getOptionID;
			}
		},

		setup: function() {
			/* Set error on required field on page load */
			rules.$formSelect.each(function() {
				if ($(this).hasClass(rules.required)) {
					$(this).parent().addClass(rules.error);
				}
			});

			rules.$formCheckbox.each(function() {
				if ($(this).hasClass(rules.required)) {
					$(this).addClass(rules.error);
				}
			});

			rules.$formRadio.each(function() {
				if ($(this).hasClass(rules.required)) {
					$(this).addClass(rules.error);
				}
			});

			/* Disable Submit Button
			rules.$formSubmitButton.attr('disabled', 'disabled');
			rules.$formResetButton.removeAttr('disabled');*/
			easyFormValidation.formSubmitState();
		},

		formSubmitState: function() {
			$(rules.$form).on('submit', function(e) {
				var $formError = $(this).find('.' + rules.error).length;

				/* console.info('Fehler gefunden: ' + $formError); */
				/* Remove error class from submit and reset button */
				rules.$formSubmitButton.parent().removeClass('error');

				$(this).find(':input').each(function() {
					if (easyFormValidation.fieldRequired(this)) {
						if (($(this).val()) === '') {
							var $selectedElementID = '#' + this.id;

							easyFormValidation.selectorFieldRules.addErrorClass($selectedElementID);

							/*console.info('[INPUT] Field has Error ' + this.id);*/
						}
					}
				});

				$(this).find('.radio-widget').each(function() {
					if ($(this).hasClass('error')) {
						$(this).parent().parent().prev().parent().addClass('error');
					}
				});

				$(this).find('select.select-widget').each(function() {
					var $selectedElementID = '#' + this.id;

					if (easyFormValidation.fieldRequired($selectedElementID)) {
						if ($($selectedElementID).hasClass('has-value') === false) {
							easyFormValidation.selectorFieldRules.addOptionErrorClass($selectedElementID);
							/*console.info('[SELECT] Field is Required and has no selection ->' + $selectedElementID);*/
						}
					}

					if ($($selectedElementID).parent().hasClass('has-select') && $($selectedElementID).parent().hasClass('has-value') === true) {
						easyFormValidation.selectorFieldRules.removeErrorClass($selectedElementID);
						/* console.info('Dropdown has value! ' + $selectedElementID); */
					}
				});

				if ($formError !== 0) {
					rules.$formSubmitButton.val(easyFormValidation.rules.formSubmitButtonErrorText_A);
					e.preventDefault();
				} else {
					rules.$formSubmitButton.val(easyFormValidation.rules.formSubmitButtonText);
					return true;
				}
			});
		},

		resetForm: function() {
			/* Reset the form */
			rules.$formResetButton.click(function(e) {
				e.preventDefault();
				$(rules.$form)[0].reset();
				rules.$formSubmitButton.val(easyFormValidation.rules.formSubmitButtonText);
				$(rules.$form).find('.' + rules.error).removeClass(rules.error);
				$(rules.$form).find('.has-select').removeClass('has-select');
				$(rules.$form).find('.has-value').removeClass('has-value');
				$(rules.$form).find(rules.$fieldErrorBox).empty();

				$(rules.$form).find('.radio-widget').each(function() {
					if ($(this).hasClass('required')) {
						$(this).addClass('error');
					}
				});

				/* Reset Select2 Dropdown */
				$('.select-widget').each(function() {
					var $noValueOptionLength = $(this).find('option[value="--NOVALUE--"]').length;

					if ($noValueOptionLength > 0) {
						$(this).val('--NOVALUE--').trigger('change');
					} else {
						$(this).val(null).trigger('change');
					}
				});

				/* Reset Select2 Selection */
				$('.select2-selection__choice').remove();
				$('.select2-results__option[aria-selected="true"]').each(function() {
					$(this).attr('aria-selected', 'false');
				});
			});
		},

		buildurl: function($selectedElementID) {
			/* Query Example http://localhost:8000/plone2/de/easyform/@@z3cform_validate_field?fname=form.widgets.allgemeine_geschaftsbedingungen&form.widgets.allgemeine_geschaftsbedingungen:list=--NOVALUE-- */
			var url = window.location.href,
					$z3cvalidator = '@@z3cform_validate_field?fname=',
					$fieldNameOriginal = $($selectedElementID).attr('name'),
					$fieldnameSplitted = '',
					$requestURI = '';

			if ($($selectedElementID).next().find(rules.$optionSelectionchoice).length) {
				$fieldnameSplitted = $fieldNameOriginal;
			} else {
				$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
			}

			$requestURI = url.substring(url.indexOf('?'), -1) + '/' + $z3cvalidator + $fieldnameSplitted + '&' + $fieldNameOriginal + '=' + easyFormValidation.getFieldValue($selectedElementID);

			return $requestURI;
		},

		buildQueryString: function($selectedElementID, $fieldNameOriginal) {
			var $fieldnameSplitted = '';

			switch ($selectedElementID) {
				case $selectedElementID:
					if ($($selectedElementID).next().find('li.select2-selection__choice').length) {
						$fieldnameSplitted = $fieldNameOriginal;
					} else {
						$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
					}

					return $fieldnameSplitted;

				default:
					$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
					return $fieldnameSplitted;
			}
		},

		checkCheckbox: function($selectedElementID) {
			var $checkBoxChecked = $($selectedElementID).prop('checked');

			return $checkBoxChecked;
		},

		onInput: function() {
			$(':input')
			.on('click', function() {
				var $selectedElementID = '#' + $(this).attr('id'),
						$currentFieldType = 'INPUT';

				if ($($selectedElementID).is(':radio')) {
					$currentFieldType = 'RADIO';
					$('input:radio').each(function() {
						$(this).removeClass('error');
						$(this).parent().parent().prev().parent().removeClass('error');
					});

					easyFormValidation.fieldRadioService($selectedElementID);
				}

				if ($($selectedElementID).is(':checkbox')) {
					$currentFieldType = 'CHECKBOX';
					easyFormValidation.fieldCheckboxService($selectedElementID, $currentFieldType);
				}

				if ($($selectedElementID).is(rules.$formResetButton) || $($selectedElementID).is(rules.$formSubmitButton)) {
					easyFormValidation.formSubmitState();

				} else {
					easyFormValidation.onFormInput($selectedElementID);
				}

				if (easyFormValidation.fieldRequired($selectedElementID)) {
					easyFormValidation.formSubmitState();
				}
			});
		},

		onFormInput: function($selectedElementID) {
			$($selectedElementID)
			.on('focusout', function() {
				var $currentFieldType = 'INPUT';

				easyFormValidation.validateElement($selectedElementID, $currentFieldType);
			});
		},

		onOptionMultiSelect: function() {
			$(rules.optionListSelector)
			.on('click', function() {
				var $selectedElementID = $(this).parent().attr('id');

				$selectedElementID = easyFormValidation.selectorFieldRules.getSelectOptionID($selectedElementID);
				easyFormValidation.onCheckOptionMultiSelect($selectedElementID);
			});
		},

		onOptionDropdown: function() {
			$(rules.onOptionDropdownSelector)
				.on('click', function() {
					var $selectedElementID = $(this).attr('id');

					$selectedElementID = easyFormValidation.selectorFieldRules.getSelectOptionDropdownID($selectedElementID);
					easyFormValidation.onCheckOptionMultiSelect($selectedElementID);
				});
		},

		onCheckOptionMultiSelect: function($selectedElementID) {
			$($selectedElementID).select2({
				placeholder: 'Bitte wählen',
				allowClear: true
			});

			$($selectedElementID)
			.on('change', function() {
				var $currentFieldType = 'SELECT';

				if ($($selectedElementID).next().find('li.select2-selection__choice').length) {
					easyFormValidation.validateElement($selectedElementID);
					easyFormValidation.selectorFieldRules.removeOptionErrorClass($selectedElementID);
					$($selectedElementID).parent().removeClass('error');

					easyFormValidation.selectorFieldRules.removeErrorMessage($selectedElementID, '');
					$($selectedElementID).prev().css('z-index', '1000');
				} else if ($($selectedElementID).parent().hasClass(rules.error)) {
					$($selectedElementID).removeClass('error');
					easyFormValidation.selectorFieldRules.removeErrorClass($selectedElementID);
					easyFormValidation.selectorFieldRules.removeOptionErrorClass($selectedElementID);
				} else {
					easyFormValidation.validateElement($selectedElementID, $currentFieldType);
				}
			});
		},

		validateElement: function($selectedElementID, $currentFieldType) {
			var json = {};

			json = $.getJSON(easyFormValidation.buildurl($selectedElementID), function() {
			})
			.done(function() {
			})
			.fail(function() {
			})
			.always(function(json) {
				var $errorMsg = json.errmsg,
				$checkError = '';

				/* Error Messages on case */
				switch ($currentFieldType) {
					case 'CHECKBOX':
						$checkError = ($errorMsg !== '') ? easyFormValidation.selectorFieldRules.addCheckboxErrorClass($selectedElementID) : easyFormValidation.selectorFieldRules.removeCheckboxErrorClass($selectedElementID);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).next().append('<span class="error fieldErrorBox" style="left:30px; top:22px">' + $errorMsg + '</span>') : $('label span.error').remove();

						return $checkError;

					case 'SELECT':
						easyFormValidation.selectorFieldRules.addErrorMessage($selectedElementID, $errorMsg);
						$checkError = ($errorMsg !== '') ? easyFormValidation.selectorFieldRules.addOptionErrorClass($selectedElementID) : easyFormValidation.selectorFieldRules.removeOptionErrorClass($selectedElementID);

						return $checkError;

					case 'INPUT':
						easyFormValidation.selectorFieldRules.addErrorMessage($selectedElementID, $errorMsg);
						$checkError = ($errorMsg !== '') ? easyFormValidation.selectorFieldRules.addErrorClass($selectedElementID) : easyFormValidation.selectorFieldRules.removeErrorClass($selectedElementID);

						return $checkError;
				}
			});
		},

		fieldRadioService: function() {
			$('input[type="radio"]').each(function(radioIdx, radio) {
				var $radio = $(radio);

				$radio.closest('.field').addClass('has-radio');
			});
		},

		fieldCheckboxService: function($selectedElementID, $currentFieldType) {
			if (easyFormValidation.fieldRequired($selectedElementID) && easyFormValidation.checkCheckbox($selectedElementID)) {
				$($selectedElementID).val(rules.optionSelected);
				easyFormValidation.selectorFieldRules.removeOptionErrorClass($selectedElementID);
			} else if (!easyFormValidation.fieldRequired($selectedElementID) && easyFormValidation.checkCheckbox($selectedElementID)) {
				$($selectedElementID).val(rules.optionSelected);
			} else {
				$($selectedElementID).val(rules.optionNoValue);
			}

			easyFormValidation.validateElement($selectedElementID, $currentFieldType);
		},

		fieldInputService: function($currentElement, $selectedElementID) {
			easyFormValidation.validateElement($currentElement, $selectedElementID);
		},

		fieldRequired: function($selectedElementID) {
			var $elementRequired = $($selectedElementID).hasClass(rules.required);

			return $elementRequired;
		},

		getFieldValue: function($selectedElementID) {
			var	$valueOfTheField = $($selectedElementID).val();

			return $valueOfTheField;
		},

		select2Init: function initSelect2() {
			var $selectFields = $('.custom-select, .select-widget, .field select'),
					eventsSet = false;

			$selectFields.map(function(index, select) {
				if ($(select).hasClass('has_optgroup')) {
					easyFormValidation.initOptgroups($(select));
				}
			});

			$selectFields.select2({
				placeholder: '',
				allowClear: true
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
						easyFormValidation.checkSelection($select2);
					}
				}
			});

			if (!eventsSet) {
				easyFormValidation.addSelect2Events();
			}
		},

		addSelect2SelectionID: function() {
			/* Adding helper selector ids for better selection in option lists */
			$('.select2-selection.select2-selection--multiple').each(function(idx) {
				$(this).attr('id', 'select2-selection-'+ idx);
			});
		},

		initOptgroups: function initOptgroups($field) {
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
		},

		addSelect2Events: function addSelect2Events() {
			var $selectFields = $('.custom-select, .select-widget, .field select'),
					$relatedLabels = $selectFields.siblings('label, .label'),
					eventsSet = false;

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

					easyFormValidation.checkSelection($select2);
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
		},

		checkSelection: function checkSelection($select2) {
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
	};

	$(document).ready(function() {
		easyFormValidation.init();
	});
})(jQuery);
