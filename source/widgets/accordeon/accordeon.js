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
				button: '[data-accordeon="button"]',
				content: '[data-accordeon="content"]'
			},
			stateClasses: {
				isOpen: 'is_open'
			},
			allowsMultiple: false,
			isInSidebar: false
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

		if (this.$element.data('multiple')) {
			this.options.allowsMultiple = true;
		}

		if (this.$element.closest('.product_sidebar').length >= 1) {
			this.options.isInSidebar = true;
		}
	};

	/**
	 * Adding the event handlers
	 * @method
	 * @public
	 */
	Widget.prototype.addEventHandlers = function() {
		this.$element.find('a' + this.options.domSelectors.button).on('click', function() {
			return false;
		});

		this.$element.find(this.options.domSelectors.button).on('click.' + this.uuid, function(event) {
			console.log('was soll der shit');

			if ($(event.currentTarget.closest(this.options.domSelectors.entry)).hasClass(this.options.stateClasses.isOpen)) {
				if (!this.options.allowsMultiple) {
					this.closeOpenEntries();
				} else {
					this.closeThisEntry($(event.currentTarget));
				}
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
		if (!this.options.allowsMultiple) {
			this.closeOpenEntries();
		}

		$button.closest(this.options.domSelectors.entry).addClass(this.options.stateClasses.isOpen);
		$button.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).attr('aria-hidden', 'false');

		if (this.options.isInSidebar) {
			$(document.body).trigger('sticky_kit:recalc');
		}
	};

	/**
	 * Closes all open entries
	 */
	Widget.prototype.closeOpenEntries = function() {
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).removeClass(this.options.stateClasses.isOpen);
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).find(this.options.domSelectors.content).attr('aria-hidden', 'true');
	};

	/**
	 * Closes this specific entry
	 */
	Widget.prototype.closeThisEntry = function($target) {
		$target.closest(this.options.domSelectors.entry).removeClass(this.options.stateClasses.isOpen);
		$target.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).attr('aria-hidden', 'true');
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
