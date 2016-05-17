/*!
 * content_nav
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'contentnav',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				item: '[data-' + name + '="item"]'
			},
			stateClasses: {
				isActive: 'is_active'
			},
			magicOffset: 25,
			magicHookPosition: 0.6
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
		this.$element.scrollToFixed({
			zIndex: 100
		});

		this.initData();

		this.initScrollMagic();
	};

	/**
	 * Inits the data for the contentnav (gets the items and the divs belonging to them)
	 */
	Module.prototype.initData = function() {
		var itemArray = [];


		$(this.options.domSelectors.item).each(function() {
			var itemObject = {};


			itemObject.domElement = this;
			itemObject.target = $(this).find('a').attr('href').substr(1);
			itemObject.targetElement = $('[data-contentnav-target="' + itemObject.target + '"]').first();

			itemArray.push(itemObject);
		});

		this.data.items = itemArray;
	};

	/**
	 * Inits the scroll Magic scenes for all elements
	 */
	Module.prototype.initScrollMagic = function() {
		var itemScene = null,
				_this = this;


		this.data.items.forEach(function(item) {
			itemScene = new ScrollMagic.Scene({
				triggerElement: '[data-contentnav-target = "' + item.targetElement.data('contentnav-target') + '"]',
				offset: _this.options.magicOffset,
				triggerHook: _this.options.magicHookPosition
			}).addIndicators();

			itemScene.on('enter leave', function() {
				_this.setActive($(item.domElement));
			});

			itemScene.addTo(magicController);

		});

		var resetScene = new ScrollMagic.Scene({
			triggerElement: '.widg_contentnav',
			offset: 100,
			triggerHook: _this.options.magicHookPosition
		});

		resetScene.on('enter leave', function() {
			_this.setActive();
		}).addIndicators();

		resetScene.addTo(magicController);
	};

	/**
	 * sets an active content nav
	 */
	Module.prototype.setActive = function($itemToSetActive) {
		$(this.options.domSelectors.item).removeClass(this.options.stateClasses.isActive);

		if (typeof $itemToSetActive !== typeof undefined) {
			$itemToSetActive.addClass(this.options.stateClasses.isActive);
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
