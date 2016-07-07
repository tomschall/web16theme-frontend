/*!
 * Accordeon
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'accordeon',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				entry: '[data-accordeon="entry"]',
				button: '[data-accordeon="button"]'
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
		this.addEventHandlers();
	};

	/**
	 * Adding the event handlers
	 * @method
	 * @public
	 */
	Widget.prototype.addEventHandlers = function() {
		$(this.options.domSelectors.button).click(function(event) {
			event.preventDefault();

			if ($(event.currentTarget.closest(this.options.domSelectors.entry)).hasClass(this.options.stateClasses.isOpen)) {
				this.closeOpenEntries();
			} else {
				this.addActiveClass($(event.currentTarget));
			}
		}.bind(this));
	};

	/**
	 * Adds the active classes for button
	 * @param $button
   */
	Widget.prototype.addActiveClass = function($button) {
		this.closeOpenEntries();

		$button.closest(this.options.domSelectors.entry).addClass(this.options.stateClasses.isOpen);
	};

	Widget.prototype.closeOpenEntries = function() {
		$(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).removeClass(this.options.stateClasses.isOpen);
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
