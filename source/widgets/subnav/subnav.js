/*!
 * {{originalName}}
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'subnav',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				// item: '[data-' + name + '="item"]'
			},
			stateClasses: {
				// isActive: 'is_active'
			},
			gutterWidth: 16
		},
		data = {
			// items: ["Item 1", "Item 2"]
		},
		maxOuterHeight = 600;

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
		if (window.estatico.mq.query({from: 'subnav'})) {
			this.doWidthCalculation();
			this.ensureEnoughHeight();
		}

		$(window).on('resize.' + this.uuid, function() {
			if (window.estatico.mq.query({from: 'subnav'})) {
				this.doWidthCalculation();
				this.ensureEnoughHeight();
			} else {
				this.$element.removeAttr('style');
			}
		}.bind(this));

		$('body').addClass('has-subnav');
	};

	Widget.prototype.doWidthCalculation = function() {
		var pageContentWidth = $('.page_content').outerWidth(),
				subnavWidth = (pageContentWidth / 2.9) - this.options.gutterWidth * 2;

		this.$element.width(subnavWidth);
	};

	Widget.prototype.ensureEnoughHeight = function() {
		if (this.$element.outerHeight() > $('.layout_content').outerHeight()) {
			$('.layout_content').outerHeight(
				this.$element.outerHeight() < maxOuterHeight ?
					this.$element.outerHeight() :
					maxOuterHeight
			);
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
