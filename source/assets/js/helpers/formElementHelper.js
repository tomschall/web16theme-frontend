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
			hasvalue: 'has-value',
			findField: '.field',
			$fieldErrorBox: $('.fieldErrorBox'),
			$formSubmitButton: $('#form-buttons-submit'),
			$formResetButton: $('#form-buttons-reset'),
			formSubmitButtonText: $('#form-buttons-submit').val(),
			formSubmitButtonErrorText_A: 'Überprüfen Sie die Angaben',
			removeChoice: 'select2-selection__choice',
			optionSelected: 'selected',
			optionNoValue: '--NOVALUE--',
			optionListSelector: 'ul.select2-selection__rendered',
			$optionSelectionchoice: 'li.select2-selection__choice',
			$onOptionDropdownSelector: 'span.select2-selection__rendered'
		},

		init: function() {
			rules = this.rules;

			easyFormValidation.setup();
			easyFormValidation.getFormState();
			easyFormValidation.onRadioService();

			if (easyFormValidation.rules.$form !== '#undefined') {
				easyFormValidation.select2Init();
			}

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
			}
		},

		setup: function() {

			$('.select-widget').prev().css('z-index', '1000');

			$('input[type="radio"]').each(function(radioIdx, radio) {
				var $radio = $(radio);

				$radio.closest(rules.findField).addClass('has-radio');
			});

			$('input[type="radio"]').each(function() {
				if ($(this).hasClass('required')) {
					$(this).val('--NOVALUE--');
				}
			});

			rules.$formCheckbox.each(function() {
				if ($(this).hasClass(rules.required)) {
					$(this).val(rules.optionNoValue);
				}
			});
		},

		formSubmitState: function() {
			rules.$formSubmitButton.on('click', function() {

				$(rules.$form).find('.select-widget, .radio-widget, .single-checkbox-widget, input[type="text"], input[type="password"], input[type="file"], textarea').each(function() {

					var $requiredSelectState = $(this),
					$selectedElementID = '#' + $requiredSelectState.attr('id');

					if ($requiredSelectState.hasClass(rules.required) && !($requiredSelectState.hasClass(rules.hasvalue))) {
						if ($requiredSelectState.hasClass('radio-widget')) {
							easyFormValidation.validateElement($selectedElementID, 'RADIO');

							/*console.info('FORM SUBMIT STATE VALIDATE RADIO -> ' + $selectedElementID);*/

						} else {
							/*console.info('tagname -> ' + $requiredSelectState.prop('tagName') + ' requiredSelectState -> ' + $requiredSelectState.attr('name') + ' has-value ' + $requiredSelectState.hasClass('has-value') + ' required ' + $requiredSelectState.hasClass('required'));*/
							easyFormValidation.validateElement($selectedElementID, $requiredSelectState.prop('tagName'));
						}
					}
				});

				var totalErrors = easyFormValidation.getFormState();

				/*console.info('GET FORM STATE -> ERROR = ' + totalErrors);*/

				if (totalErrors !== 0) {
					/* console.info('MORE THAN 0 ERRORS = ' + totalErrors); */
					$(this).val(rules.formSubmitButtonErrorText_A).fadeTo(1000, 0.1, function() {
						$(this).val(rules.formSubmitButtonText).fadeTo(500, 1);
					});

					return false;
				} else {

					/* console.info('FORM READY TO SUBMIT!'); */
					return true;
				}
			});
		},

		getFormState: function() {
			var $countError = 0;

			$(rules.$form).find('.select-widget, .radio-widget, .single-checkbox-widget, input[type="text"], input[type="password"], input[type="file"], textarea').each(function() {
				var $requiredSelectState = $(this);

				if ($requiredSelectState.hasClass(rules.required) && !($requiredSelectState.hasClass(rules.hasvalue))) {
					if ($requiredSelectState.hasClass('radio-widget')) {
						$countError++;
					} else {
						$countError++;
					}
				}
			}).trigger('change');

			return $countError;
		},

		resetForm: function() {
			/* Reset the form */
			rules.$formResetButton.click(function(e) {
				e.preventDefault();
				$(rules.$form)[0].reset();
				rules.$formSubmitButton.val(easyFormValidation.rules.formSubmitButtonText);
				$(rules.$form).find('.' + rules.error).removeClass(rules.error);
				$(rules.$form).find('.has-select').removeClass('has-select');
				$(rules.$form).find('.' + rules.hasvalue).removeClass(rules.hasvalue);
				$(rules.$form).find(rules.$fieldErrorBox).empty();

				/* Reset Select2 Dropdown */
				$('.select-widget').select2({
					placeholder: 'Bitte wählen',
					val: null
				});

				$('input[type="radio"]').each(function() {
					if ($(this).hasClass('required')) {
						$(this).val('--NOVALUE--');
					}
				});

				easyFormValidation.onOptionDropdown();
				easyFormValidation.onOptionMultiSelect();
			});
		},

		buildurl: function($selectedElementID) {
			/* Query Example http://localhost:8000/plone2/de/easyform/@@z3cform_validate_field?fname=form.widgets.allgemeine_geschaftsbedingungen&form.widgets.allgemeine_geschaftsbedingungen:list=--NOVALUE-- */
			var url = window.location.href,
					$z3cvalidator = '@@z3cform_validate_field?fname=',
					$fieldNameOriginal = $($selectedElementID).attr('name'),
					$fieldnameSplitted = '',
					$requestURI = '';

			if ($($selectedElementID).hasClass(rules.hasvalue)) {
				$fieldnameSplitted = $fieldNameOriginal;

			} else {
				$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
			}

			var urlVar = url.substring(url.indexOf('?'), -1);

			if (urlVar) {
				url = urlVar;
				/*console.info('use urlHash ' + urlVar);*/
			}

			$requestURI = url + '/' + $z3cvalidator + $fieldnameSplitted + '&' + $fieldNameOriginal + '=' + easyFormValidation.getFieldValue($selectedElementID);

			/*console.info('requestURI -> ' + $requestURI);*/

			return $requestURI;
		},

		checkCheckbox: function($selectedElementID) {
			var $checkBoxChecked = $($selectedElementID).prop('checked');

			return $checkBoxChecked;
		},

		onInput: function() {
			$(':input[type="text"], :input[type="checkbox"], :input[type="radio"], textarea, :input[type="password"], :input[type="file"]')
			.on('click', function() {
				var $selectedElementID = '#' + $(this).attr('id'),
						$currentFieldType = 'INPUT';

				if ($($selectedElementID).is(':radio')) {
					$currentFieldType = 'RADIO';

					easyFormValidation.onRadioService($selectedElementID, $currentFieldType);
				}

				if ($($selectedElementID).is(':checkbox')) {
					$currentFieldType = 'CHECKBOX';
					easyFormValidation.fieldCheckboxService($selectedElementID, $currentFieldType);
				}

				easyFormValidation.onFormInput($selectedElementID);
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
			$('ul.select2-selection__rendered')
			.on('mouseenter', function() {
				var $selectedElementID = '#' + $(this).closest(rules.findField).find('select').attr('id');

				$($selectedElementID).select2('open');

				easyFormValidation.onCheckOptionMultiSelect($selectedElementID);
			});
		},

		onOptionDropdown: function() {
			$('span.select2-selection__rendered')
				.on('mouseenter', function() {
					var $selectedElementID = '#' + $(this).closest(rules.findField).find('select').attr('id');

					/*console.info('[onOptionDropdown] MOUSEOVER -> ' + $selectedElementID);*/

					easyFormValidation.onCheckDropdownSelect($selectedElementID);

				});
		},

		onCheckDropdownSelect: function($selectedElementID) {
			$($selectedElementID).select2({
				placeholder: 'Bitte wählen',
				closeOnSelect: true,
				allowClear: true
			});

			$($selectedElementID).on('change', function() {

				var $currentFieldType = 'SELECT';

				easyFormValidation.validateElement($selectedElementID, $currentFieldType);

				/*console.info('VALIDATE DROPDOWN ' + $selectedElementID);*/
			});
		},

		onCheckOptionMultiSelect: function($selectedElementID) {

			$($selectedElementID).select2({
				placeholder: 'Bitte wählen',
				allowClear: true,
				closeOnSelect: false
			});

			$($selectedElementID).on('change', function() {
				var $currentFieldType = 'SELECT';

				easyFormValidation.validateElement($selectedElementID, $currentFieldType);
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
					case 'SELECT':
						$($selectedElementID).closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).addClass('error') : $($selectedElementID).removeClass('error');

						/*console.info('VALIDATE SELECT ' + $selectedElementID);*/

						return $checkError;

					case 'RADIO':
						$($selectedElementID).closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).removeClass(rules.hasvalue) : $($selectedElementID).addClass(rules.hasvalue);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).closest(rules.findField).addClass(rules.error) : $($selectedElementID).closest(rules.findField).removeClass(rules.error);

						return $checkError;

					case 'INPUT':
					case 'TEXTAREA':
					case 'CHECKBOX':
						$($selectedElementID).closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);
						/*$($selectedElementID).closest(rules.findField).find('fieldErrorBox').text($errorMsg);*/
						$checkError = ($errorMsg !== '') ? easyFormValidation.selectorFieldRules.addErrorClass($selectedElementID) : easyFormValidation.selectorFieldRules.removeErrorClass($selectedElementID);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).removeClass(rules.hasvalue) : $($selectedElementID).addClass(rules.hasvalue);

						/*console.info('VALIDATE INPUT TEXTAREA CHECKBOX' + $selectedElementID);*/

						return $checkError;

					default:
						$($selectedElementID).closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);
						/*$($selectedElementID).closest(rules.findField).find('fieldErrorBox').text($errorMsg);*/
						$checkError = ($errorMsg !== '') ? easyFormValidation.selectorFieldRules.addErrorClass($selectedElementID) : easyFormValidation.selectorFieldRules.removeErrorClass($selectedElementID);
						$checkError = ($errorMsg !== '') ? $($selectedElementID).removeClass(rules.hasvalue) : $($selectedElementID).addClass(rules.hasvalue);

						/*console.info('VALIDATE DEFAULT' + $selectedElementID);*/

						return $checkError;
				}
			});
		},

		onRadioService: function($selectedElementID, $currentFieldType) {
			$($selectedElementID).on('change', function() {

				/*console.info('Radio Clicked -> ' + $selectedElementID);*/

				$($selectedElementID).closest('.field').find('input').each(function() {
					var radioValue = $(this).next().text();

					$(this).val(radioValue);
					$(this).removeClass('error');
					$(this).closest('.field').removeClass('error');
				});

				easyFormValidation.validateElement($selectedElementID, $currentFieldType);
			});
		},

		fieldCheckboxService: function($selectedElementID, $currentFieldType) {
			if (easyFormValidation.fieldRequired($selectedElementID) && easyFormValidation.checkCheckbox($selectedElementID)) {
				$($selectedElementID).val(rules.optionSelected);
				$($selectedElementID).addClass(rules.hasvalue);
			} else if (!easyFormValidation.fieldRequired($selectedElementID) && easyFormValidation.checkCheckbox($selectedElementID)) {
				$($selectedElementID).val(rules.optionSelected);
			} else {
				$($selectedElementID).val(rules.optionNoValue);
				$($selectedElementID).removeClass(rules.hasvalue);
			}

			easyFormValidation.validateElement($selectedElementID, $currentFieldType);
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
				allowClear: false,
				minimumResultsForSearch: 25
			});

			$selectFields.map(function(index, select) {
				var $select = $(select),
				$select2 = $(select).nextAll('.select2-container'),
				$field = $select.parent(rules.findField);

				if ($field.length > 0) {
					$field.addClass('has-select');
					if (typeof $select.attr('multiple') !== typeof undefined) {
						$field.addClass('has-multiple-select');
					}
				}

				if (!$select.hasClass(rules.hasvalue)) {
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

				if ($select.closest(rules.findField).length > 0) {
					$field = $select.closest(rules.findField);
				}

				if ($select.val() === null || $select.val() === '') {
					$select2.removeClass('has-selection');
					$select2.nextAll('.custom-select___remover').hide();
					$select.removeClass(rules.hasvalue);

					if ($field !== null) {
						$field.removeClass(rules.hasvalue);
					}
				} else {
					$select2.addClass('has-selection');
					$select2.nextAll('.custom-select___remover').show();
					$select.addClass(rules.hasvalue);

					if ($field !== null) {
						$field.addClass(rules.hasvalue);
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
