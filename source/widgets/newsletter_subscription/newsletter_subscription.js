/*!
 * Newsletter Subscription
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'newsletter_subscription',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				form: '[data-' + name + '="form"]',
				emailInput: '[data-' + name + '="mailInput"]'
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
		this.bindEvents();
	};

	Widget.prototype.bindEvents = function() {
		$(this.options.domSelectors.form).on('submit', function(event) {
			event.preventDefault();

			if (!$(this.options.domSelectors.emailInput).hasClass('error')) {
				var emailValue = $(this.options.domSelectors.emailInput).val();

				$.ajax({
					url: $(this.options.domSelectors.form).data('request-url'),
					data: {
						email: emailValue
					}
				});
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
