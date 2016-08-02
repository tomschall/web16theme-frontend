/*!
 * Product Bar
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'productbar',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				// item: '[data-' + name + '="item"]'
			},
			stateClasses: {
				isVisible: 'is_visible'
			},
			scrollMagicScene: null
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
		this.addInitialScrollMagic();

		this.addEventListeners();
	};

	/**
	 * Adds the scroll magic scene
	 */
	Widget.prototype.addInitialScrollMagic = function() {
		var scene = new ScrollMagic.Scene({
			triggerElement: '.page_content',
			offset: 100
		});

		scene.on('enter leave', function() {
			this.$element.toggle(0, function() {
				this.$element.toggleClass(this.options.stateClasses.isVisible);
			}.bind(this));
		}.bind(this));

		this.options.scrollMagicScene = scene;

		window.estatico.magicController.addScene(scene);
	};

	/**
	 * Adding the event listeners
	 */
	Widget.prototype.addEventListeners = function() {
		this.$element.find('a').on('click.' + this.uuid, function(event) {
			// Only temporary solution
			event.preventDefault();

			var _scrollTop = $($(event.target).attr('href')).offset().top;

			$('html, body').animate({
				scrollTop: _scrollTop - 150
			}, 750);
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
