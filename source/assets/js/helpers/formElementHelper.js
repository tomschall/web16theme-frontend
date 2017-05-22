/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var rules,
		$form = $('form'),
		formId = $form.attr('id');

	/**
	 * Returns page language or defaults to `de`
	 *
	 * @returns {string} Langugae code
	 */
	function getLanguage() {
		var acceptedLanguages = ['de', 'en', 'fr'],
			lang = $('html').attr('lang');

		// return the language or default to first one in the list
		return acceptedLanguages.indexOf(lang) >= 0 ? lang : acceptedLanguages[0];
	}

	/**
	 * Converts date if it matches d.m.y pattern, original value otherwise
	 *
	 * @param {string} str Date in d.m.y format
	 * @returns {string} Date in yyyy-mm-dd format or original value
	 */
	function convertDate(str) {
		return str.replace(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{1,4})$\s*/g, function(__, d, m, y) {
			return [_.padStart(y, 4, '0'), _.padStart(m, 2, '0'), _.padStart(d, 2, '0')].join('-');
		});
	}

	var easyFormValidation = {
		rules: {
			$form: '#' + formId,
			$formSelect: $('select', $form),
			$formCheckbox: $('input:checkbox', $form),
			$formRadio: $('input:radio', $form),
			$formDate: $form.find('input.pat-pickadate'),
			required: 'required',
			error: 'error',
			hasvalue: 'has-value',
			findField: '.field',
			$fieldErrorBox: $('.fieldErrorBox', $form),
			$formSubmitButton: $('#form-buttons-submit', $form),
			$formResetButton: $('#form-buttons-reset', $form),
			formSubmitButtonText: $('#form-buttons-submit', $form).val(),
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
			easyFormValidation.select2Init();
			easyFormValidation.addSelect2SelectionID();
			easyFormValidation.onInput();
			easyFormValidation.onOptionDropdown();
			easyFormValidation.onOptionMultiSelect();
			easyFormValidation.resetForm();
			easyFormValidation.formSubmitState();
		},

		setup: function() {
			$form.find('.select-widget').prev().css('z-index', '1000');

			$form.find('input[type="radio"]').each(function(radioIdx, radio) {
				var $radio = $(radio);
				$radio.closest(rules.findField).addClass('has-radio');
			});

			$form.find('input[type="radio"]').each(function() {
				if ($(this).hasClass('required')) {
					$(this).val('--NOVALUE--');
				}
			});

			rules.$formCheckbox.each(function() {
				if ($(this).hasClass(rules.required)) {
					$(this).val(rules.optionNoValue);
				}
			});

			this.setupDatepickers();

			// file inputs have proprietary constructs, propagate necessary classes onto input
			$form.find('.named-file-widget input[type="file"]').each(function() {
				var $input = $(this);
				if ($input.parents('.named-file-widget').hasClass('required')) {
					$input.addClass('required');
				}
			});
		},

		setupDatepickers: function() {
			var language = getLanguage(),

				// update datepicker defaults based on the current language and
				// configuration provided by the first datepicker on te page
				datepickerSettings = $form.find('[data-pat-pickadate]').eq(0).attr('data-pat-pickadate');

			if (datepickerSettings) {
				datepickerSettings = JSON.parse(datepickerSettings);

				$.fn.datepicker.dates[language] = $.extend({}, $.fn.datepicker.dates.en, {
					days: datepickerSettings.date.weekdaysFull,
					daysShort: datepickerSettings.date.weekdaysShort,
					daysMin: datepickerSettings.date.weekdaysShort,
					months: datepickerSettings.date.monthsFull,
					monthsShort: datepickerSettings.date.monthsShort,
					today: datepickerSettings.today,
					clear: datepickerSettings.clear
				});
			}

			rules.$formDate.each(function() {
				var $el = $(this);

				// convert loaded value from server side form (YYYY-MM-DD) to user format dd.mm.yyyy
				$el.val($el.val().replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3.$2.$1'));
				$el.attr('placeholder', 'DD.MM.YYYY');
				$el.datepicker({
					weekStart: 1,
					autoclose: true,
					todayHighlight: true,
					format: 'dd.mm.yyyy',
					language: language,
					forceParse: false,
					templates: {
						leftArrow: ' ',
						rightArrow: ' '
					}
				});

				// append calendar icon after the input element
				$el.after('<div class="datepicker-icon icon_ical"></div>');
			});
		},

		formSubmitState: function() {
			$form.on('submit', function(e) {

				// internal flag - is set to true on second automated submit if
				// validation was successful
				if (this._formValid) {
					this._formValid = false; // clear the flag
					return; // do nothing, already validated
				}

				// prevent form submission
				e.preventDefault();

				var validators = $(rules.$form).find('.select-widget, .radio-widget, .single-checkbox-widget, input[type="text"], input[type="password"], input[type="file"], textarea').map(function() {
					return easyFormValidation.validateElement($(this));
				}).toArray();

				$.when.apply($, validators).done(function() {
					// convert all date values on submit to backend format
					rules.$formDate.each(function() {
						var $el = $(this);
						$el.val(convertDate($el.val()));
					});

					setTimeout(function() {

						// set valid flag and resubmit form
						this._formValid = true;
						rules.$formSubmitButton.click();
					}.bind(this));
				}.bind(this)).fail(function() {
					$(this).val(rules.formSubmitButtonErrorText_A).fadeTo(1000, 0.1, function() {
						$(this).val(rules.formSubmitButtonText).fadeTo(500, 1);
					});
				}.bind(this));
			});
		},

		getFormState: function() {
			var countError = 0;
			$(rules.$form).find('.select-widget, .radio-widget, .single-checkbox-widget, input[type="text"], input[type="password"], input[type="file"], textarea').each(function() {
				var $requiredSelectState = $(this);
				if ($requiredSelectState.hasClass(rules.required) && !($requiredSelectState.hasClass(rules.hasvalue))) {
					countError++;
				}
			}).trigger('change');
			return countError;
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
				$form.find('.select-widget').select2({
					placeholder: 'Bitte wählen',
					val: null
				});

				$form.find('input[type="radio"]').each(function() {
					if ($(this).hasClass('required')) {
						$(this).val('--NOVALUE--');
					}
				});

				easyFormValidation.onOptionDropdown();
				easyFormValidation.onOptionMultiSelect();
			});
		},

		buildurl: function($el) {
			/* Query Example http://localhost:8000/plone2/de/easyform/@@z3cform_validate_field?fname=form.widgets.allgemeine_geschaftsbedingungen&form.widgets.allgemeine_geschaftsbedingungen:list=--NOVALUE-- */
			var url = window.location.href,
				$z3cvalidator = '@@z3cform_validate_field?fname=',
				$fieldNameOriginal = $el.attr('name'),
				$fieldnameSplitted = '',
				$requestURI = '';

			if ($el.hasClass(rules.hasvalue)) {
				$fieldnameSplitted = $fieldNameOriginal;
			} else {
				$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
			}

			var urlVar = url.substring(url.indexOf('?'), -1);

			if (urlVar) {
				url = urlVar;
				/*console.info('use urlHash ' + urlVar);*/
			}

			$requestURI = url + '/' + $z3cvalidator + $fieldnameSplitted + '&' + $fieldNameOriginal + '=' + easyFormValidation.getFieldValue($el);
			/*console.info('requestURI -> ' + $requestURI);*/
			return $requestURI;
		},

		checkCheckbox: function($el) {
			return $el.prop('checked');
		},

		onInput: function() {
			$form.find(':input[type="text"], :input[type="checkbox"], :input[type="radio"], textarea, :input[type="password"], :input[type="file"]')
				.on('focusout', _.debounce(easyFormValidation.onInputChange, 300));

			$form.find('input[type="radio"]').on('change', function() {
				easyFormValidation.onRadioChange($(this));
			});

			$form.find('input[type="checkbox"]').on('click', function() {
				easyFormValidation.fieldCheckboxService($(this));
			});
		},

		onInputChange: function(event) {
			easyFormValidation.validateElement($(event.target));
		},

		onOptionMultiSelect: function() {
			$form.find('ul.select2-selection__rendered')
				.on('mouseenter', function() {
					var $el = $(this).closest(rules.findField).find('select');
					$el.select2('open');
					easyFormValidation.onCheckOptionMultiSelect($el);
				});
		},

		onOptionDropdown: function() {
			$form.find('span.select2-selection__rendered')
				.on('mouseenter', function() {
					var $el = $(this).closest(rules.findField).find('select');
					/*console.info('[onOptionDropdown] MOUSEOVER -> ' + $el);*/
					easyFormValidation.onCheckDropdownSelect($el);
				});
		},

		onCheckDropdownSelect: function($el) {
			$el.select2({
				placeholder: 'Bitte wählen',
				closeOnSelect: true,
				allowClear: true
			});

			$el.on('change', function() {
				easyFormValidation.validateElement($el);
			});
		},

		onCheckOptionMultiSelect: function($el) {
			$el.select2({
				placeholder: 'Bitte wählen',
				allowClear: true,
				closeOnSelect: false
			});

			$el.on('change', function() {
				easyFormValidation.validateElement($el);
			});
		},

		/**
		 * Validates element value through call to backend.
		 *
		 * @param {HTMLElement} $el Input or composite element
		 * @returns {Promise} Resolves if elements value is valid
		 */
		validateElement: function($el) {
			var $currentFieldType = $el.prop('tagName');

			if (!$el.hasClass(rules.required) || $el.hasClass(rules.hasvalue)) {
				// no validation required
				return;
			}

			// special handling for radio buttons
			if ($el.hasClass('radio-widget')) {
				$currentFieldType = 'RADIO';

				// validate radio widgets client side only - #658
				if ($form.find('[name=' + $el.attr('name').replace(/\./gm, '\\.') + ']:checked').size()) {
					// some option is selected -> field is valid
					return;
				}
			}

			if ($el.is('.pat-pickadate') && $el.val().trim() && !/^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/g.test($el.val())) {
				// datepicker
				$el.removeClass(rules.hasvalue);
				$el.parent().addClass(rules.error);
				return $.Deferred().reject('Invalid date format').promise();
			}

			debugger;
			return $.getJSON(easyFormValidation.buildurl($el)).always(function(json) {
				var $errorMsg = json.errmsg,
					isValid = $errorMsg === '';

				$el.closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);

				/* Error Messages on case */
				switch ($currentFieldType) {
					case 'SELECT':
						$el.toggleClass('error', !isValid);
						break;
					case 'RADIO':
						$el.toggleClass(rules.hasvalue, isValid);
						$el.closest(rules.findField).toggleClass(rules.error, !isValid);
						break;
					case 'INPUT':
					case 'TEXTAREA':
					case 'CHECKBOX':
						$el.toggleClass(rules.hasvalue, isValid);
						$el.parents('.field:first').toggleClass(rules.error, !isValid);
						break;
					default:
						$el.toggleClass(rules.hasvalue, isValid);
						$el.parent().toggleClass(rules.error, !isValid);
				}

				if (!isValid) {
					return $.Deferred().reject($errorMsg).promise();
				}
			});
		},

		onRadioChange: function($el) {
			$el.closest('.field').find('input').each(function() {
				var radioValue = $(this).next().text();
				$(this).val(radioValue);
				$(this).removeClass('error');
				$(this).closest('.field').removeClass('error');
			});
			easyFormValidation.validateElement($el);
		},

		fieldCheckboxService: function($el) {
			if (easyFormValidation.fieldRequired($el) && easyFormValidation.checkCheckbox($el)) {
				$($el).val(rules.optionSelected);
				$($el).addClass(rules.hasvalue);
			} else if (!easyFormValidation.fieldRequired($el) && easyFormValidation.checkCheckbox($el)) {
				$($el).val(rules.optionSelected);
			} else {
				$($el).val(rules.optionNoValue);
				$($el).removeClass(rules.hasvalue);
			}

			easyFormValidation.validateElement($el);
		},

		fieldRequired: function($el) {
			return $el.hasClass(rules.required);
		},

		getFieldValue: function($el) {
			var	$valueOfTheField = $el.val();

			if (($el).data().datepicker) {

				// element is a datepicker, perform value conversion as backend requires YYYY-MM-DD
				// accepted user input is dd.mm.yyyy
				$valueOfTheField = convertDate($valueOfTheField);
			}

			return $valueOfTheField;
		},

		select2Init: function initSelect2() {
			var $selectFields = $('.custom-select, .select-widget, .field select');

			$selectFields = $selectFields.filter(function() {
				return $(this).is('select');
			});

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

			easyFormValidation.addSelect2Events();
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
				$relatedLabels = $selectFields.siblings('label, .label');

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

	window.estatico.easyFormValidation = easyFormValidation;

	$(document).ready(function() {
		easyFormValidation.init();
	});
})(jQuery);
