/**
 * Add global event listeners which check if and input in an text input container is filled and adds a class,
 * replaces the ugly selects
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var rules,
	$form = $('#form');

	/**
	 * Get value from form and set it to analytics form
	 *
	 * @returns {void}
	 */
	(function setAnalyticsFormTag() {
		var analyticsProduktField = $('#analyticsProduktField').val();
		var inputType = '';
		var $fields = $('form').find('#form-widgets-' + analyticsProduktField);
		if ($fields.length) {
			if ($fields[0].localName === 'select') {
				inputType = 'change';
			} else {
				inputType = 'input';
			}
		} else {
			return;
		}
		$fields.on(inputType, function(event) {
			var $values = $(event.currentTarget).val();
			var $newval = '';
			if ($values !== null) {
				if (Array.isArray($values)) {
					$newval = $values.join();
				} else if ($values !== '--NOVALUE--') {
					$newval = $values;
				}
			}
			$('#analyticsProdukt').val($newval);
		});
	})();


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
	 * @param {string} d Date in d.m.y format
	 * @param {string} t Time
	 * @returns {string} Date in yyyy-mm-dd format or original value
	 */
	function convertDate(d, t) {
		t = t || '';
		return (d || '').replace(/^\s*(\d{1,2})\.(\d{1,2})\.(\d{1,4})$\s*/g, function(__, day, m, y) {
			return [_.padStart(y, 4, '0'), _.padStart(m, 2, '0'), _.padStart(day, 2, '0')].join('-');
		}) + (t ? ' ' + t : '');
	}

	function isValidDate(val) {
		return /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/g.test(val);
	}

	function isValidTime(val) {
		return /^\s*(\d{1,2}):(\d{1,2})\s*$/g.test(val);
	}

	function getRules() {
		return {
			$formSelect: $('select', $form),
			$formCheckbox: $('input:checkbox', $form),
			$formRadio: $('input:radio', $form),
			$formDate: $form.find('input.pat-pickadate'),
			$fieldsets: $form.find('fieldset'),
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
		};
	}

	var easyFormValidation = {
		rules: getRules(),

		init: function($form_) {
			if ($form_ !== undefined) {
				$form = $form_;
				this.rules = getRules();
			}

			rules = this.rules;
			easyFormValidation.setup();
			easyFormValidation.getFormState();
			easyFormValidation.select2Init();
			easyFormValidation.addSelect2SelectionID();
			easyFormValidation.onInput();
			easyFormValidation.onOptionDropdown();
			easyFormValidation.onOptionMultiSelect();
			easyFormValidation.resetForm();
			easyFormValidation.uploadSize();

			$form.on('submit', easyFormValidation.onSubmit.bind(easyFormValidation));
		},

		uploadSize: function() {

			function bytesToSize(bytes) {
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes === 0) {
					return '0 Byte';
				}
				var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
				return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
			}

			function local__getLanguage() {
				var theLanguage = $('html').attr('lang');
				return theLanguage;
			}

			// Adding reset button for upload field
			$('input[type="file"]').on('click', function() {
				var addFieldID = $(this).attr('id');
				var rndFigure = Math.floor((Math.random() * 100) + 1);
                 $(this).next().remove();
				$(this).after('<span class="select2-selection__clear upload-reset" id="' + addFieldID + '-' + rndFigure + '"> × </span>');
			});

			$('input[type="file"]').on('change', function() {
			var totalSize = 0;
				var allowedUploadSize = 7340032; // 7 MB max. Data upload
				var lang = local__getLanguage();


		// Adding reset button, clearing upload field
		$('.upload-reset').on('click', function() {
			var whichElem = $(this).attr('id');
			var curUploadField = $(this).prev().attr('id');

			$('#' + whichElem).parent().prev().hide();
			$(this).prev().val('');
			$('#' + curUploadField).trigger('change');
			$(this).remove();
		});

			$('input[type="file"]').each(function() {
				var uploadField = '#' + $(this).attr('id');

				for (var i = 0; i < this.files.length; i++) {
					totalSize += this.files[i].size;
					$(uploadField).parent().parent().find('.fieldErrorBox').text(bytesToSize(this.files[i].size));
					$(uploadField).parent().parent().find('.fieldErrorBox').css('color', 'black').show();
				}

				var valid = totalSize <= allowedUploadSize;
				var fileDiffSuccess = allowedUploadSize - totalSize;
				var fileDiffError = totalSize - allowedUploadSize;
				var notValidStyle = 'background: rgba(225,50,90,.1); color: #df305b; border: solid 2px #df305b; display: block; padding: 15px; margin-bottom: 15px;';
				var validStyle = 'background: rgba(12, 128, 0, 0.14); color: green; border: solid 2px green; display: block; padding: 15px; margin-bottom: 15px;';

				// FILEUPLOAD -> ERROR MESSAGES
				if (!valid) {
					$('input[type="file"]').each(function() {
						$(this).parent().parent().addClass('error');
						$(this).parent().parent().find('.fieldErrorBox').css('color', 'red');
					});

					$('#uploadWarning').remove();
					//console.log('ERROR -> Erlaubt: ' + bytesToSize(allowedUploadSize) + ': Überschuss: ' + bytesToSize(fileDiffError));
					$('#form-buttons-submit').attr('disabled', 'disabled');
						if (lang === 'de') {
                            $('#form-buttons-submit').before('<div id="uploadWarning" style="' +
									notValidStyle + '">Der max. zulässige Datenanhang von <strong><i>' +
									bytesToSize(allowedUploadSize) + '</i></strong> wird um <strong>' +
									bytesToSize(fileDiffError) +
									'</strong> überschritten. Bitte reduzieren Sie Ihren Datenanhang.</div>');
						}
						if (lang === 'en') {
							$('#form-buttons-submit').before('<div id="uploadWarning" style="' +
									notValidStyle + '">The maximum data attachment of <strong><i>' +
									bytesToSize(allowedUploadSize) + '</i></strong> is exceeded by <strong>' +
									bytesToSize(fileDiffError) +
									'</strong>. Please reduce the size of your attachment.</div>');
						}
						if (lang === 'fr') {
							$('#form-buttons-submit').before('<div id="uploadWarning" style="' +
									notValidStyle + '">La limite de <strong><i>' + bytesToSize(allowedUploadSize) +
									'</i></strong> a été excédée de <strong>' +
									bytesToSize(fileDiffError) +
									'</strong>. Veuillez réduire le poids de votre annexe.</div>');
						}
				}
				// FILEUPLOAD -> SUCCESS MESSAGES
				if (valid) {
					$('input[type="file"]').each(function() {
                        $(this).parent().parent().removeClass('error');
						$(this).parent().parent().find('.fieldErrorBox').css('color', 'black');
					});


					$('#uploadWarning').remove();

					if (lang === 'de') {
						$('#form-buttons-submit').before('<div id="uploadWarning" style="' +
								validStyle + '">Datenanhang: OK. Die max. erlaubte Datenmenge von <strong><i>' +
								bytesToSize(allowedUploadSize) +
								'</i></strong> hat noch Kapazität für <strong>' +
								bytesToSize(fileDiffSuccess) + '</strong>.</div>');
					}
					if (lang === 'en') {
						$('#form-buttons-submit').before('<div id="uploadWarning" style="' +
								validStyle + '">Attachement: OK. Still <strong><i>' +
								bytesToSize(fileDiffSuccess) +
								'</i></strong> can be added for a maximum of <strong>' +
								bytesToSize(allowedUploadSize) +
								'</strong>.</div>');
					}
					if (lang === 'fr') {
						$('#form-buttons-submit').before('<div id="uploadWarning" style="' +
								validStyle + '">Annexe: OK. <strong><i>' +
								bytesToSize(fileDiffSuccess) +
								'</i></strong> peuvent être ajoutés pour un maximum de <strong>' +
								bytesToSize(allowedUploadSize) + '</strong>.</div>');
					}
					// console.log('SUCCESS -> Erlaubt: ' + bytesToSize(allowedUploadSize) + ': Bestand: ' + bytesToSize(fileDiffSuccess));
					$('#form-buttons-submit').removeAttr('disabled');
				}
				});
			});
		},

		setup: function() {
			$form.find('.select-widget').prev().css('z-index', '1000');

			$form.find('input[type="radio"]').each(function() {
				$(this).closest(rules.findField).addClass('has-radio');
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
				var $el = $(this), // original input field
					settings = JSON.parse($el.attr('data-pat-pickadate')),
					$clone = $el.clone();

				$el.addClass('field--date');
				$clone.attr('id', 'ref-' + $el.attr('name'));
				$clone.attr('name', $el.attr('name') + '--date');
				$clone.addClass('pat-pickadate-ref--date field--partial'); // tell validator to skip validation, the origin field shall be validated instead.
				$el.attr('type', 'hidden');
				$el.after($clone);

				if (settings.time) {
					// append time picker

					var $timepicker = $('<input type="text" class="pat-pickadate-ref--date field--time field--partial" placeholder="' +
							settings.time.placeholder + '" autocomplete="off">');
					$timepicker.attr('name', $el.attr('name') + '--time');
					$clone.after($timepicker);

					$timepicker.timepicker({
						timeFormat: 'HH:mm',
						scrollDefault: 'now',
						step: function() {
							return 15;
						}
					});
					$($el).parent('.field').addClass('fields-horizontal');
				}

				// convert loaded value from server side form (YYYY-MM-DD) to user format dd.mm.yyyy
				$clone.val($el.val().replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3.$2.$1'));
				$clone.attr('placeholder', 'DD.MM.YYYY');
				$clone.datepicker({
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
				var $icon = $('<a href="#" class="datepicker-icon icon_ical"></a>').click(function(event) {
					$clone.datepicker('show');
					event.preventDefault();
					event.stopPropagation();
				});
				$clone.after($icon);
			});
		},

		onSubmit: function(e) {
            easyFormValidation.getFormState();

            // internal flag - is set to true on second automated submit if
			// validation was successful
			if (this._formValid) {
        $('body').append('<div id="overlay"><div id="fhnw-spinner"></div></div>');
        $('#fhnw-spinner').spinner({
          radius: 30,
          strokeWidth: 6,
          color: '#fff'
        });
        this._formValid = false; // clear the flag
        return undefined; // do nothing, already validated
      }

      // Check upload fields
      $form.find('input[type="file"]').each(function() {
          if ($(this).hasClass('required')) {
              if ($(this).val() === '') {
                  $(this).parents().addClass('error');
              } else {
                  $(this).parents().removeClass('error');
              }
          }
      });


			// prevent form submission
			e.preventDefault();

			var fields = [],
				validators = $form.find('.select-widget, .radio-widget, .single-checkbox-widget, input[type="text"],' +
						' input[type="password"], textarea').map(function() {
					var $el = $(this),
						fieldName = $el.attr('name');
					if (fields.indexOf(fieldName) >= 0) {
						// field already validating
						// NOTE we need this for field groups - e.g. there might be multiple radio fields with the same name
						return undefined;
					}
					fields.push(fieldName);
					return easyFormValidation.validateElement($(this));
				}).toArray();

			return $.when.apply($, validators).done(function() {
				setTimeout(function() {
					// set valid flag and resubmit form
					this._formValid = true;
					rules.$formSubmitButton.click();
				}.bind(this));
			}.bind(this)).fail(function() {
          // Error message above submit button
          if ($('.errorOnSubmit').length === 0) {
              $('#form-buttons-submit').before('<div class="errorOnSubmit">' +
              '<p style="margin-bottom:0; font-size: 12px; font-weight: 100;">' +
              'Bitte füllen Sie alle mit einem <span>*</span> gekennzeichneten Pflichtfelder aus.</p></div>');
              $('#form').prepend('<div class="errorOnSubmit">' +
              '<p style="margin-bottom:0; font-size: 12px; font-weight: 100;">' +
              'Bitte füllen Sie alle mit einem <span>*</span> gekennzeichneten Pflichtfelder aus.</p></div>');
          }

          // Set first error field on focus
          $('html, body').animate({
            scrollTop: $('.error:visible:first').offset().top
          }, 1000);
			});
		},

		getFormState: function() {
			var countError = 0;
			$form.find('input[type="text"], .select-widget, .radio-widget, .single-checkbox-widget, input[type="text"], input[type="password"], textarea').each(function() {
				var $requiredSelectState = $(this);
				if ($requiredSelectState.hasClass(rules.required) && !($requiredSelectState.hasClass(rules.hasvalue))) {
					countError++;
				}
            }).trigger('change');
            return countError;
		},

		resetForm: function() {
			// Reset the form
			rules.$formResetButton.click(function(e) {
				e.preventDefault();
				$form[0].reset();
				rules.$formSubmitButton.val(easyFormValidation.rules.formSubmitButtonText);
				$form.find('.' + rules.error).removeClass(rules.error);
				$form.find('.has-select').removeClass('has-select');
				$form.find('.upload-reset').remove();
				$form.find('.' + rules.hasvalue).removeClass(rules.hasvalue);
				$form.find(rules.$fieldErrorBox).empty();
                $('.errorOnSubmit').remove();
				$('#uploadWarning').remove();

				// Reset Select2 Dropdown
				$form.find('.select-widget').select2({
					placeholder: 'Bitte wählen',
					val: null
				});

				easyFormValidation.onOptionDropdown();
				easyFormValidation.onOptionMultiSelect();
			});
		},

		// eslint-disable-next-line max-len
		// Query Example http://localhost:8000/plone2/de/easyform/@@z3cform_validate_field?fname=form.widgets.allgemeine_geschaftsbedingungen&form.widgets.allgemeine_geschaftsbedingungen:list=--NOVALUE--
		buildurl: function($el) {
			var url = window.location.href,
				$z3cvalidator = '@@z3cform_validate_field?fname=',
				$fieldNameOriginal = $el.attr('name'),
				$fieldnameSplitted = '';

			if ($el.hasClass(rules.hasvalue)) {
				$fieldnameSplitted = $fieldNameOriginal;
			} else {
				$fieldnameSplitted = $fieldNameOriginal.split(':') ? $fieldNameOriginal.split(':')[0] : $fieldNameOriginal;
			}

			var urlVar = url.substring(url.indexOf('?'), -1);

			if (urlVar) {
				url = urlVar;
			}

			var $requestURI = url + '/' + $z3cvalidator + $fieldnameSplitted + '&' + $fieldNameOriginal + '=' + encodeURIComponent(easyFormValidation.getFieldValue($el));

			// Easy form validator requires fieldset index (fset attribute) to be added to the url,
			// but this needs to be skipped for the first fieldset. Also the fset attribute for second
			// fieldset is 0 instead of 1.

			// Example:
			//
			// +----------------+
			// |fieldset (0)	|
			// |skip &fset	  |
			// +----------------+
			// +----------------+
			// |fieldset (1)	|
			// |&fset=0		 |
			// +----------------+
			// +----------------+
			// |fieldset (2)	|
			// |&fset=1		 |
			// +----------------+

			for (var i = 1; i < rules.$fieldsets.size(); i++) {
				if (rules.$fieldsets.eq(i).has($el).size()) {
					// decrement index for the validator
					$requestURI += '&fset=' + (i - 1);
					break;
				}
			}

			return $requestURI;
		},

		checkCheckbox: function($el) {
			return $el.prop('checked');
		},

		onInput: function() {
			$form.find(':input[type="text"], :input[type="checkbox"], :input[type="radio"], textarea, :input[type="password"]')
				.on('focusout', _.debounce(easyFormValidation.onInputChange, 300));

			$form.find('input[type="radio"]').on('change', function() {
				easyFormValidation.onRadioChange($(this));
			});

			$form.find('input[type="checkbox"]').on('click', function() {
				easyFormValidation.fieldCheckboxService($(this));
			});

			$form.find(':input[type="text"].pat-pickadate-ref--date').change(function() {
				easyFormValidation.synchronizeDateFields($(this));
			});
		},

		onInputChange: function(event) {
			var $el = $(event.target);
			if ($el.hasClass('pat-pickadate-ref--date')) {
				// synchronize fields
				easyFormValidation.synchronizeDateFields($el);
			}

			easyFormValidation.validateElement($el);
		},

		synchronizeDateFields: function($el) {
			// find date and (if) time fields
			var $inputs = $el.parent().find('.pat-pickadate-ref--date');
			$el.parent().find('.pat-pickadate:not(.pat-pickadate-ref--date)').val(convertDate($inputs.eq(0).val(), $inputs.eq(1).val()));
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

			function updateFieldStatus($local__el, $local__currentFieldType, isValid, $errorMsg) {
				$errorMsg = $errorMsg === undefined ? '' : $errorMsg;
				$local__el.closest(rules.findField).find(rules.$fieldErrorBox).text($errorMsg);

				// Error Messages on case
				switch ($local__currentFieldType) {
					case 'SELECT':
						$local__el.toggleClass('error', !isValid);
						break;
					case 'RADIO':
						$local__el.toggleClass(rules.hasvalue, isValid);
						$local__el.closest(rules.findField).toggleClass(rules.error, !isValid);
						break;
					case 'INPUT':
					case 'TEXTAREA':
					case 'CHECKBOX':
						$local__el.toggleClass(rules.hasvalue, isValid);
						$local__el.parents('.field:first').toggleClass(rules.error, !isValid);
						break;
					default:
						$local__el.toggleClass(rules.hasvalue, isValid);
						$local__el.parent().toggleClass(rules.error, !isValid);
				}
			}

			if ($el.hasClass('pat-pickadate-ref--date')) {
				var $inputs = $el.parent().find('.pat-pickadate-ref--date'),
					isRequired = $inputs.eq(0).hasClass(rules.required),
					date = $inputs.eq(0).val().trim(),
					isValid = true;

				isValid = (!isRequired && !date.length) || isValidDate(date);
				$inputs.eq(0).toggleClass('field--partial-error', !isValid);

				if ($inputs.size() === 2) {
					// has time field
					var time = $inputs.eq(1).val().trim(),
						isTimeValid = (!isRequired && !date.length && !time.length) || (isValidTime(time) && date.length > 0);
					isValid = isValid && isTimeValid;
					$inputs.eq(1).toggleClass('field--partial-error', !isTimeValid);
				}

				if (!isValid) {
					updateFieldStatus($el, $currentFieldType, false);
					return new $.Deferred().reject('Invalid format').promise();
				}
			}

			if (!$el.hasClass(rules.required) || $el.hasClass(rules.hasvalue)) {
				// no validation required
				updateFieldStatus($el, $currentFieldType, true);
				return undefined;
			}

			if ($el.hasClass('single-checkbox-widget')) {
				if (easyFormValidation.getFieldValue($el) === '') {
					updateFieldStatus($el, $currentFieldType, false);
					return new $.Deferred().reject('Required').promise();
				}
			} else if ($el.hasClass('radio-widget')) {
				// special handling for radio buttons
				$currentFieldType = 'RADIO';

				// validate radio widgets client side only - #658
				if ($form.find('[name=' + $el.attr('name').replace(/\./gm, '\\.') + ']:checked').size()) {
					// some option is selected -> field is valid
					updateFieldStatus($el, $currentFieldType, true);
					return undefined;
				}
			}

			var deferred = new $.Deferred();

			$.getJSON(easyFormValidation.buildurl($el)).always(function(json) {
				var $errorMsg = json.errmsg,
					local__isValid = $errorMsg === '';

				updateFieldStatus($el, $currentFieldType, local__isValid, $errorMsg);
				return local__isValid ? deferred.resolve('') : deferred.reject($errorMsg);
			});
			return deferred.promise();
		},

		onRadioChange: function($el) {
			$el.closest('.field').find('input').not('[type=hidden]').each(function() {
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
			$el = $($el);
			var	value = $el.val();

			if ($el.is('[type=radio]') && $form.find('[name=' + $el.attr('name').replace(/\./gm, '\\.') + ']:checked').size() === 0) {
				// clear value if not checked
				value = '';
			} else if ($el.hasClass('single-checkbox-widget') && !$el.is(':checked')) {
				value = '';
			} else if ($el.data().datepicker) {
				// element is a datepicker, perform value conversion as backend requires YYYY-MM-DD
				// accepted user input is dd.mm.yyyy
				value = convertDate(value);
			}
			return value;
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
			// Adding helper selector ids for better selection in option lists
			$('.select2-selection.select2-selection--multiple').each(function(idx) {
				$(this).attr('id', 'select2-selection-' + idx);
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
				$(this).prevAll('select').val('').trigger('change', [true]);
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

	if (!window.__PREVENT_INITIALIZATION__) {
		$(document).ready(function() {
			easyFormValidation.init();

			// workaround https://gitlab.fhnw.ch/webteam/fhnw.webauftritt/issues/988 -> removing attribute "disabled" from upload button
			if ($('.named-file-widget input').length) {
				$('.named-file-widget input').removeAttr('disabled');

				$('.named-file-widget input').each(function() {
					if ($('.named-file-widget input').is(':checked')) {
						$('.named-file-widget input').removeAttr('checked');
					}
				});
			}
		});
	}
})(jQuery);
