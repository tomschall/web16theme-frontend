/*!
 * content_nav
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_Widgets/some/dependency.js
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
			magicOffset: -20,
			magicHookPosition: 0.3
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

	/**
	 * Create an instance of the Widget
	 * @constructor
	 * @param {object} element - The DOM element to bind the Widget
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
		this.$element.scrollToFixed({
			zIndex: 100
		});

		this.initData();

		this.initScrollMagic();

		this.addEventListener();
	};

	/**
	 * Adds the event listeners
	 */
	Widget.prototype.addEventListener = function() {
		$(this.options.domSelectors.item).find('a').click(function(e) {
			e.preventDefault();

			var target = $(this).attr('href').substr(1),
					targetOffset = $('[data-contentnav-target="' + target + '"]').first().offset().top;

			$('html, body').animate({
				scrollTop: targetOffset - 150
			}, 'slow');
		});
	};

	/**
	 * Inits the data for the contentnav (gets the items and the divs belonging to them)
	 */
	Widget.prototype.initData = function() {
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
	Widget.prototype.initScrollMagic = function() {
		var itemScene = null,
				itemSceneFromBottom = null,
				resetScene = null,
				$triggerElement = null,
				triggerElementHeight = 0,
				offset = this.options.magicOffset,
				triggerHook = this.options.magicHookPosition;

		this.data.items.forEach(function(item) {
			$triggerElement = $('[data-contentnav-target = "' + item.targetElement.data('contentnav-target') + '"]');
			triggerElementHeight = $triggerElement.height();

			itemScene = new ScrollMagic.Scene({
				triggerElement: '[data-contentnav-target = "' + item.targetElement.data('contentnav-target') + '"]',
				offset: offset,
				triggerHook: triggerHook
			});

			itemScene.on('enter leave', function() {
				this.setActive($(item.domElement));
			}.bind(this));

			itemScene.addTo(window.estatico.magicController);

			itemSceneFromBottom = new ScrollMagic.Scene({
				triggerElement: '[data-contentnav-target = "' + item.targetElement.data('contentnav-target') + '"]',
				offset: triggerElementHeight,
				triggerHook: triggerHook
			});

			itemSceneFromBottom.on('enter leave', function() {
				this.setActive($(item.domElement));
			}.bind(this));

			itemSceneFromBottom.addTo(window.estatico.magicController);

		}.bind(this));

		resetScene = new ScrollMagic.Scene({
			triggerElement: '.widg_contentnav',
			offset: 100,
			triggerHook: triggerHook
		});

		resetScene.on('enter leave', function() {
			this.setActive();
		}.bind(this));

		resetScene.addTo(window.estatico.magicController);
	};

	/**
	 * sets an active content nav
	 */
	Widget.prototype.setActive = function($itemToSetActive) {
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
