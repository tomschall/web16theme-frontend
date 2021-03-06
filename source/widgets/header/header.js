/*!
 * Header
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_Widgets/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'header',
			events = {
				shrink: 'shrink.estatico.' + name
			},
			defaults = {
				domSelectors: {
					// item: '[data-' + name + '="item"]'
				},
				stateClasses: {
					isNavOpen: 'is_nav-open'
				},
				scrollMagicScene: null,
				scrollMagicScene2: null,
				isCollapsible: false
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

		this.addEventListener();

		if (window.estatico.mq.query({from: 'medium'})) {
			if (this.$element.data('header-collapsible')) {
				this.addInitialScrollMagic();
				this.options.isCollapsible = false;
			}
		}
	};

	Widget.prototype.addEventListener = function() {
		this.$element.on('click.' + this.uuid, function() {
			if (this.$element.hasClass('is_shrinked') && window.estatico.mq.query({from: 'medium'})) {
				this.$element.addClass('is_expanded');
				this.$element.removeClass('is_shrinked');
				// this.addDynamicScrollMagic();
			}
		}.bind(this));

		$(window).on('scroll.' + this.uuid, function() {
			if ($(window).scrollTop() === 0 && window.estatico.mq.query({from: 'medium'})) {
				if (this.$element.hasClass('is_shrinked')) {
					// this.toggleShrinked();
					// this.addDynamicScrollMagic();
				}
			}

			/* Shrinking engl. logo  webteam/fhnw.webauftritt#1402 */
			if (document.documentElement.lang === 'en' && (this.$element.hasClass('is_shrinked'))) {
				$('.widg_logo').css('width', '80px');
			}
		}.bind(this));

		$(window).on('open.estatico.navigation.' + this.uuid, function() {
			this.$element.addClass(this.options.stateClasses.isNavOpen);
		}.bind(this));

		$(window).on('close.estatico.navigation.' + this.uuid, function(event, controlModal) {
			this.$element.removeClass(this.options.stateClasses.isNavOpen);

			if (typeof controlModal === typeof undefined) {
				controlModal = true;
			}

			if (controlModal) {
				window.estatico.modal.hideModal();
			}
		}.bind(this));
	};

	/**
	 * Adds the scroll magic functionality
	 */
	Widget.prototype.addInitialScrollMagic = function() {
		if (!$('.page_wrapper').hasClass('header__wide')) {
			var headerScene = new ScrollMagic.Scene({
				triggerElement: '#main',
				offset: 5,
				triggerHook: 0
			});

			// headerScene.on('enter leave', function() {
			// 	this.toggleShrinked();
			// }.bind(this));

			this.options.scrollMagicScene = headerScene;

			window.estatico.magicController.addScene(headerScene);
		}

	};

	/**
	 * Adds a dynamic scroll magic based on position of header
	 */
	Widget.prototype.addDynamicScrollMagic = function() {
		var dynamicHeaderScene = new ScrollMagic.Scene({
					triggerElement: '#main',
					offset: $(window).scrollTop() + 200,
					triggerHook: 0
				}),
				dynamicHeaderScene2 = new ScrollMagic.Scene({
					triggerElement: '#main',
					offset: $(window).scrollTop() - 200,
					triggerHook: 0
				});

		// dynamicHeaderScene.on('enter leave', function() {
		// 	this.toggleShrinked();
		// }.bind(this));

		// dynamicHeaderScene2.on('leave', function() {
		// 	this.toggleShrinked();
		// }.bind(this));

		this.options.scrollMagicScene = dynamicHeaderScene;
		this.options.scrollMagicScene2 = dynamicHeaderScene2;

		this.options.scrollMagicScene.addTo(window.estatico.magicController);
		this.options.scrollMagicScene2.addTo(window.estatico.magicController);
	};

	/**
	 * shrink or not to shrink. toggles the shrink class for widg_header
	 */
	// Widget.prototype.toggleShrinked = function() {
	// 	// this.$element.toggleClass('is_shrinked');

	// 	if (this.$element.hasClass('is_shrinked')) {
	// 		this.$element.removeClass('is_expanded');
	// 	}

	// 	if (this.options.scrollMagicScene) {
	// 		this.options.scrollMagicScene.destroy(false);
	// 		this.options.scrollMagicScene = null;
	// 	}

	// 	if (this.options.scrollMagicScene2) {
	// 		this.options.scrollMagicScene2.destroy(false);
	// 		this.options.scrollMagicScene2 = null;
	// 	}

	// 	$(document).trigger(events.shrink);
	// };

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
