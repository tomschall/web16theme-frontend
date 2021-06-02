/*!
 * Hero
 *
 * @author FHNW - Thomas Schallert, Roland Von Aesch, Mr. Oizo
 * @copyright FHNW
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'hero',
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

		this.initImageScale();

	};

	Widget.prototype.initImageScale = function() {

		var cuttingOption = $('#widg_hero__image').data('heroCuttingOption');
		var align = '';

		var optionsObj = {
			default: 'center',
			topLeft: 'top-left',
			topCenter: 'top',
			topRight: 'top-right',
			centerLeft: 'left',
			centerCenter: 'center',
			centerRight: 'right',
			bottomLeft: 'bottom-left',
			bottomCenter: 'bottom',
			bottomRight: 'bottom-right'
		};

		if (optionsObj[cuttingOption] === undefined) {
			optionsObj[cuttingOption] = 'center';
		}

		if ($('.widg_hero__img.is-profile-hero').length) {
			align = 'bottom-right';
		} else {
			align = optionsObj[cuttingOption];
		}

		$('.widg_hero__img').imageScale({
			rescaleOnResize: true,
			scale: 'best-fill',
			align: align,
		});
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
