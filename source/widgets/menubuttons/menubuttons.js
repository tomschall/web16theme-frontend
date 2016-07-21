/*!
 * Menu Buttons
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_Widgets/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'menubuttons',
		events = {
			closeMobileHeader: 'closeMobileHeader.estatico.' + name,
			openSearch: 'openSearch.estatico.' + name,
			closeSearch: 'closeSearch.estatico.' + name
		},
		defaults = {
			domSelectors: {
				menubutton: '[data-' + name + '="menu"]',
				searchbutton: '[data-' + name + '="search"]'
			},
			stateClasses: {
				isNavOpen: 'is_nav-open',
				isActive: 'is_active'
			},
			fullHeader: false,
			searchIsOpen: false
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
		this.addEventListeners();
	};

	/**
	 * Adding all the event listeners for the menubuttons
	 */
	Widget.prototype.addEventListeners = function() {
		$(this.options.domSelectors.menubutton).on('click.' + this.uuid, function() {
			if (this.options.fullHeader) {
				$(this.options.domSelectors.menubutton).removeClass(this.options.stateClasses.isActive);

				this.closeFullHeader();
			} else {
				$(this.options.domSelectors.menubutton).addClass(this.options.stateClasses.isActive);

				this.showFullHeader();
			}

		}.bind(this));

		$(this.options.domSelectors.searchbutton).on('click.' + this.uuid, function() {

			if (this.options.searchIsOpen) {
				this.options.searchIsOpen = false;

				$(this.options.domSelectors.searchbutton).removeClass(this.options.stateClasses.isActive);

				$(window).trigger(events.closeSearch);
			} else {
				this.options.searchIsOpen = true;
				$(this.options.domSelectors.searchbutton).addClass(this.options.stateClasses.isActive);

				$(window).trigger(events.openSearch);
			}
		}.bind(this));

		$(window).on('close.estatico.pagesearch.' + this.uuid, function() {
			this.options.searchIsOpen = false;
		}.bind(this));
	};

	/**
	 * Shows the full header
	 */
	Widget.prototype.showFullHeader = function() {
		$('.widg_header').addClass(this.options.stateClasses.isNavOpen);

		this.options.fullHeader = true;
	};

	/**
	 * Close the full header
	 */
	Widget.prototype.closeFullHeader = function() {
		$('.widg_header').removeClass(this.options.stateClasses.isNavOpen);

		this.options.fullHeader = false;

		$(document).trigger(events.closeMobileHeader);
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
