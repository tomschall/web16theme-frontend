/*!
 * Navigation
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'navigation',
			events = {
				// eventname: 'eventname.estatico.' + name
			},
			defaults = {
				domSelectors: {
					expandable: '[data-navigation="expandable"]',
					subWrappers: '[data-navigation="sub-wrapper"]'
				},
				stateClasses: {
					// isActive: 'is_active'
				},
				maxAdditionalNavLevel: 3
			},
			data = {
				wrappers: []
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
		this.initWrappers();
	};

	Widget.prototype.initWrappers = function() {
		var $wrapperDom = '';

		for (var i = 1; i <= this.options.maxAdditionalNavLevel; i++) {
			$wrapperDom = $('<div class="widg_navigation__sub-wrapper" data-navigation="sub-wrapper" data-navigation-level="' + i + '"></div>');

			this.data.wrappers[i] = $wrapperDom;

			$('.page_wrapper').append($wrapperDom);
		}
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
