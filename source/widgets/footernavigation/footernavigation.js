/*!
 * Location
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'footernavigation',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				columnTitle: '[data-' + name + '="columnTitle"]',
				column: '[data-' + name + '="column"]'
			},
			stateClasses: {
				isOpen: 'is_open'
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
		this.addEventListeners();
	};

	/**
	 * Adding the event listeners
	 */
	Widget.prototype.addEventListeners = function() {
		$(this.options.domSelectors.columnTitle).on('click.' + this.uuid, function(event) {
			if (window.estatico.mq.query({to: 'medium'})) {
				if ($(event.currentTarget).closest(this.options.domSelectors.column).hasClass(this.options.stateClasses.isOpen)) {
					$(this.options.domSelectors.columnTitle).closest(this.options.domSelectors.column).removeClass(this.options.stateClasses.isOpen).find('ul').slideUp(500);
				} else {
					$(this.options.domSelectors.columnTitle).closest(this.options.domSelectors.column).removeClass(this.options.stateClasses.isOpen).find('ul').slideUp(500);

					$(event.currentTarget).closest(this.options.domSelectors.column).addClass(this.options.stateClasses.isOpen).find('ul').slideDown(500);
				}
			}
		}.bind(this));
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
