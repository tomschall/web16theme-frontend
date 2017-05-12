/*!
 * In-Content Search
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 */

;(function($, undefined) {
	'use strict';

	var name = 'in_content_search',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				// item: '[data-' + name + '="item"]'
			},
			stateClasses: {
				// isActive: 'is_active'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

	/**
	 * Create an instance of the widget
	 * @constructor
	 * @param {object} element - The DOM element to bind the widget
	 * @param {object} options - Options overwriting the defaults
	 */
	function Widget(element, options) {
		this._helper = estatico.helpers.SuperClass;

		this._helper({
			name: name,
			element: element,
			defaults: defaults,
			options: options,
			events: events,
			data: data
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		var searchParameters = estatico.search.getSearchParameters(),
			$form = this.$element.find('form');
		this.$formElements = $form.find('select');
		this.fillForm(searchParameters);

		// override form submit action
		$form.on('submit', function(event) {
			event.preventDefault();
			var searchParams = {};
			this.$formElements.map(function(index, element) {
				searchParams[$(element).data('searchparam')] = $(element).val();
			});
			window.location = $form.attr('action') + '#' + window.estatico.search.encodeSearchParameters(searchParams);
		}.bind(this));
	};

	Widget.prototype.fillForm = function(searchParameters) {
		for (var key in searchParameters) {
			if (searchParameters.hasOwnProperty(key)) {
				$('[data-searchparam="' + key + '"]').val(searchParameters[key]);
			}
		}
		// change event corrects the select2 fields label positioning and rendering
		this.$formElements.trigger('change');
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);
