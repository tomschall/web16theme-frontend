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
			openMobileHeader: 'openMobileHeader.estatico.' + name,
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
				isActive: 'is_active',
				isSearchOpen: 'is_search-open'
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
		var strings = {
			de: {
				menu: 'Menü',
				search: 'Suche'
			},
			en: {
				menu: 'Menu',
				search: 'Search'
			}
		}[document.documentElement.lang];

		$('[data-menubuttons="menu"]').each(function() {
			this.innerText = ' ' + strings.menu;
		});
		$('[data-menubuttons="search"]').each(function() {
			this.innerText = ' ' + strings.search;
		});

		this.addEventListeners();
	};

	/**
	 * Adding all the event listeners for the menubuttons
	 */
	Widget.prototype.addEventListeners = function() {
		$(this.options.domSelectors.menubutton).on('click.' + this.uuid, function() {
			if (this.options.fullHeader) {
				$(this.options.domSelectors.menubutton).removeClass(this.options.stateClasses.isActive)
						.attr('aria-expanded', 'false');
				this.closeFullHeader();
			} else {
				$(this.options.domSelectors.menubutton).addClass(this.options.stateClasses.isActive)
						.attr('aria-expanded', 'true');
				this.showFullHeader();
			}
		}.bind(this));

		$(this.options.domSelectors.searchbutton).on('click.' + this.uuid, function() {
			if (this.options.searchIsOpen) {
				this.closeMobileSearch();
			} else {
				this.openMobileSearch();
			}
		}.bind(this));

		$(window).on('close.estatico.searchbar.' + this.uuid, function() {
			this.options.searchIsOpen = false;

			$(this.options.domSelectors.searchbutton).removeClass(this.options.stateClasses.isActive);
		}.bind(this));
	};

	/**
	 * Shows the full header
	 */
	Widget.prototype.showFullHeader = function() {
		var $headerOrigin = $('.widg_header'),
				$clone = $('.widg_header___cloned');

		if ($clone.length === 0) {
			$clone = $headerOrigin.clone(true);

			$clone.addClass('widg_header___cloned').attr('id', 'widg_header___cloned');

			$clone.find('.widg_header__inner-top').remove();

			$('.page_wrapper').append($clone);
		}

		if (!window.estatico.mq.query({from: 'medium'})) {
			$clone.find('.widg_header__inner-foot').appendTo($clone.find('nav > .widg_navigation__list'));
		}

		$headerOrigin.addClass(this.options.stateClasses.isNavOpen);
		$clone.addClass(this.options.stateClasses.isNavOpen);

		this.options.fullHeader = true;

		$(window).trigger(events.closeSearch);
		$(this.options.domSelectors.searchbutton).removeClass(this.options.stateClasses.isActive);

		this.addPreventScroll();
	};

	/**
	 * Close the full header
	 */
	Widget.prototype.closeFullHeader = function() {
		$('.widg_header').removeClass(this.options.stateClasses.isNavOpen);

		this.options.fullHeader = false;

		$(document).trigger(events.closeMobileHeader);

		this.removePreventScroll();
	};

	/**
	 * Function to trigger the search opening
	 */
	Widget.prototype.openMobileSearch = function() {
		this.options.searchIsOpen = true;

		$(this.options.domSelectors.searchbutton).addClass(this.options.stateClasses.isActive)
				.attr('aria-expanded', 'true');
		$('.widg_header').addClass(this.options.stateClasses.openSearch);

		$(window).trigger(events.openSearch);

		this.closeFullHeader();
		$(this.options.domSelectors.menubutton).removeClass(this.options.stateClasses.isActive);

		this.addPreventScroll();
	};

	Widget.prototype.closeMobileSearch = function() {
		this.options.searchIsOpen = false;

		$(this.options.domSelectors.searchbutton).removeClass(this.options.stateClasses.isActive)
				.attr('aria-expanded', 'false');
		$('.widg_header').removeClass(this.options.stateClasses.openSearch);

		$(window).trigger(events.closeSearch);
		this.removePreventScroll();
	};

	/**
	 * Adds a class to the body, to prevent scrolling on the body
	 */
	Widget.prototype.addPreventScroll = function() {
		$('body').addClass('prevent-scroll');
	};

	/**
	 * Removing the prevent scroll class from the body
	 */
	Widget.prototype.removePreventScroll = function() {
		$('body').removeClass('prevent-scroll');
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
