/**
 * Add global event listener which checks if text input is filled or select is checked and adds the selected values
 * to a hidden form tag with id #analyticsProduktField
 */

;(function($) {
	'use strict';

	/**
	 * Get values from select2 - multiselect
	 *
	 */
	function checkSelect2SelectedFields(analyticsProduktField) {
		var multi_fields = $('#form').find('#form-widgets-' + analyticsProduktField)
			.nextAll('span')
			.find('.select2-selection__rendered');
		if (multi_fields[0].title.length) {
			return multi_fields[0].title;
		}
		var multi_fields_selected = [];
		for (var key in multi_fields[0].children) {
			if (multi_fields[0].children.hasOwnProperty(key)) {
				if (parseInt(key, 10) !== 0) {
					multi_fields_selected.push(multi_fields[0].children[key].innerText);
				}
			}
		}
		return multi_fields_selected.join();
	}

	/**
	 * Get value from form and set it to hidden analytics form
	 *
	 * @returns {void}
	 */
	function setAnalyticsFormTags() {
		var analyticsProduktField = $('#analyticsProduktField').val();
		var inputType = '';
		var fields = $('#form').find('#form-widgets-' + analyticsProduktField);
		if (fields.length) {
			if (fields[0].localName === 'select') {
				$('#analyticsProdukt').val(checkSelect2SelectedFields(analyticsProduktField));
				inputType = 'change';
			} else {
				$('#analyticsProdukt').val(fields[0].value);
				inputType = 'input';
			}
		} else {
			return;
		}
		fields.on(inputType, function(event) {
			var values = $(event.currentTarget).val();
			var newval = '';
			if (values !== null) {
				if (Array.isArray(values)) {
					newval = values.join();
				} else if (values !== '--NOVALUE--') {
					newval = values;
				}
			}
			$('#analyticsProdukt').val(newval);
		});
	}

	var analyticsFormTags = {
		init: function() {
			setAnalyticsFormTags();
		},
	};

	window.estatico.analyticsFormTags = analyticsFormTags;

	if (!window.__PREVENT_INITIALIZATION__) {
		$(document).ready(function() {
			analyticsFormTags.init();
		});
	}

})(jQuery);
