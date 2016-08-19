/*!
 * Sidebar
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'sidebar',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				item: '[data-' + name + '="item"]',
				content: '[data-' + name + '="content"]'
			},
			stateClasses: {
				isFixed: 'is_fixed'
			}
		},
		data = {
			items: null
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
		data.items = this.$element.find(this.options.domSelectors.item);

		this.addScrollToFixed();
	};

	Widget.prototype.addScrollToFixed = function() {
		var calcedMargin = 0,
				isFixedClass = 'scroll-to-fixed-fixed';

		this.enumerateItems();

		data.items.map(function(index, element) {

			$(element).scrollToFixed({
				spacerClass: 'test',
				marginTop: function() {
					var orderNumber = $(this).data(name + '-order');

					if (orderNumber === 0) {
						calcedMargin = 30;
					} else {
						calcedMargin = 30 + $('.' + isFixedClass + ' h3').outerHeight() + (orderNumber * 30) + 42;
					}

					return calcedMargin;
				},

				fixed: function() {
					$(this).next('.test').css({
						height: $(this).outerHeight(true)
					});
				}
			});
		}.bind(this));
	};

	/**
	 * Makes an order in the order they are loaded on the page
	 */

	Widget.prototype.enumerateItems = function() {
		var counter = 0;

		data.items.map(function(index, element) {
			$(element).data(name + '-order', counter);

			console.log($(element).data('sidebar-order'));

			counter++;
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
