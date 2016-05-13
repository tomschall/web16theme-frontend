/*!
 * Header
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'header',
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
	 * Create an instance of the module
	 * @constructor
	 * @param {object} element - The DOM element to bind the module
	 * @param {object} options - Options overwriting the defaults
	 */
	function Module(element, options) {
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

	Module.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Module.prototype);

	/**
	 * Initialize module, bind events.
	 * @method
	 * @public
	 */
	Module.prototype.init = function() {
		console.log('module header initialized');



		if (estatico.mq.query({from: 'medium'})) {
			this.addScrollMagic();
		}
	};

	Module.prototype.addScrollMagic = function() {
		var scrollMagicController = new ScrollMagic.Controller(),
				scrollMagicScene = new ScrollMagic.Scene({
					triggerElement: '#main',
					offset: 200,
					triggerHook: 0
				})
						.addIndicators()
						.setClassToggle('#header', 'widg_header___shrinked');

		scrollMagicScene.addTo(scrollMagicController);
	};

	Module.prototype.toggleShrinked = function() {
		if (this.$element.hasClass('widg_header__expanded')) {
			this.$element.toggleClass('widg_header__:shrinked');
		}
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Module.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Module, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);
