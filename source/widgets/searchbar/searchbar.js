/*!
 * page_search
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_Widgets/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'searchbar',
		events = {
			open: 'open.estatico.' + name,
			close: 'close.estatico.' + name
		},
		defaults = {
			domSelectors: {
				btn: '[data-' + name + '="btn"]',
				bar: '[data-' + name + '="bar"]'
			},
			stateClasses: {
				isOpen: 'is_open'
			}
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
		this.addEventHandlers();
	};

	/**
	 * adding the vent handlers
	 */
	Widget.prototype.addEventHandlers = function() {
		$(this.options.domSelectors.btn).on('click.' + this.uuid, function() {
			this.openSearchBar();
		}.bind(this));

		$(window).on('open.estatico.navigation.' + this.uuid, function() {
			this.closeSearchBar(false);
		}.bind(this));

		$(window).on('openSearch.estatico.menubuttons.' + this.uuid, function() {
			this.openSearchBar();
		}.bind(this));

		$(window).on('closeSearch.estatico.menubuttons.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));
	};

	/**
	 * Opens the search bar
	 */
	Widget.prototype.openSearchBar = function() {
		$(this.options.domSelectors.bar).addClass(this.options.stateClasses.isOpen);

		$(window).trigger(events.open);

		window.estatico.modal.addPreventScroll();
		window.estatico.modal.showModal();

		this.addSingleEventListeners();

    setTimeout(function() {
      $('input[name="searchbar_search"]').trigger('focus');
    }, 1000);
	};

	/**
	 * Close the search bar
	 */
	Widget.prototype.closeSearchBar = function(removePreventScroll) {
		if (typeof removePreventScroll === typeof undefined) {
			removePreventScroll = true;
		}

		$(this.options.domSelectors.bar).removeClass(this.options.stateClasses.isOpen);

		$(window).trigger(events.close);
    if (removePreventScroll) {
			window.estatico.modal.hideModal();
			window.estatico.modal.removePreventScroll();
		}
	};

	/**
	 * Adding the single event listeners (one)
	 */
	Widget.prototype.addSingleEventListeners = function() {
		// Additional single time events
		$(window).one('keydown.' + this.uuid, function(event) {
			if (event.keyCode === 27) {
				this.closeSearchBar();
			}
		}.bind(this));

		$('.modal').one('click.' + this.uuid, function() {
			this.closeSearchBar();
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
