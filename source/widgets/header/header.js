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
				},
				scrollMagicScene: null
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

		this.addEventListener();

		if (estatico.mq.query({from: 'medium'})) {
			this.addInitialScrollMagic();
		}
	};

	Module.prototype.addEventListener = function() {
		var _this = this;


		this.$element.on('click' + '.' + this.uuid, function() {
			if ($(this).hasClass('widg_header___shrinked')) {
				_this.$element.addClass('widg_header___expanded');
				_this.$element.removeClass('widg_header___shrinked');

				_this.addDynamicScrollMagic();
			}
		});
	};

	/**
	 * Adds the scroll magic functionality
	 */
	Module.prototype.addInitialScrollMagic = function() {
		var _this = this,
				headerScene = new ScrollMagic.Scene({
					triggerElement: '#main',
					offset: 1,
					triggerHook: 0
				})
						.addIndicators();

		headerScene.on('enter leave', function() {
			_this.toggleShrinked();
		});

		this.options.scrollMagicScene = headerScene;

		this.options.scrollMagicScene.addTo(magicController);
	};

	/**
	 * Adds a dynamic scroll magic based on position of header
	 */
	Module.prototype.addDynamicScrollMagic = function() {
		var _this = this,
				dynamicHeaderScene = new ScrollMagic.Scene({
					triggerElement: '#main',
					offset: $(window).scrollTop() + 200,
					triggerHook: 0
				}).addIndicators();

		dynamicHeaderScene.on('enter leave', function() {
			_this.toggleShrinked();
		});

		this.options.scrollMagicScene = dynamicHeaderScene;

		this.options.scrollMagicScene.addTo(magicController);

	};

	/**
	 * shrink or not to shrink. toggles the shrink class for widg_header
	 */
	Module.prototype.toggleShrinked = function() {
		this.$element.toggleClass('widg_header___shrinked');

		if (this.$element.hasClass('widg_header___shrinked')) {
			this.$element.removeClass('widg_header___expanded');
		}

		this.options.scrollMagicScene.destroy(false);
		this.options.scrollMagicScene = null;
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
