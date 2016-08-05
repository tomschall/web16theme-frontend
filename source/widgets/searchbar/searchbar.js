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
				bar: '[data-' + name + '="bar"]',
				close: '[data-' + name + '="close"]',
				input: '[data-' + name + '="input"]'
			},
			stateClasses: {
				isOpen: 'is_open'
			},
			searchBarIsOpen: false,
			currentSearchValue: null,
			searchIsFilled: false
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
			if (this.options.searchBarIsOpen) {
				this.closeSearchBar();
			} else {
				this.openSearchBar();
			}
		}.bind(this));

		$(this.options.domSelectors.close).on('click.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));

		$(window).on('open.estatico.navigation.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));

		$(window).on('openSearch.estatico.menubuttons.' + this.uuid, function() {
			this.openSearchBar();
		}.bind(this));

		$(window).on('closeSearch.estatico.menubuttons.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));

		$(this.options.domSelectors.input).on('keyup.' + this.uuid, function(event) {
			var value = $(event.currentTarget).val();

			if (value.length >= 3 && value !== this.options.currentSearchValue) {
				this.sendXHRObject($(event.currentTarget).val());
			}

			this.options.currentSearchValue = value;

		}.bind(this));
	};

	/**
	 * Sends the xhr object to search module in global namespace
	 * @param _inputValue the input value
   */
	Widget.prototype.sendXHRObject = function(_inputValue) {
		var xhrObject = {
			q: _inputValue
		};

		window.estatico.search.search(xhrObject, true);
	};

	/**
	 * Opens the search bar
	 */
	Widget.prototype.openSearchBar = function() {
		$(this.options.domSelectors.bar).addClass(this.options.stateClasses.isOpen);
		this.options.searchBarIsOpen = true;

		$(window).trigger(events.open);

		$('body').addClass('prevent-scroll');

		/**
		 * Have to set the timeout so focus can be set
		 */
		setTimeout(function() {
			$(this.options.domSelectors.input).focus();
		}.bind(this), 100);

		this.addSingleEventListeners();
	};

	/**
	 * Close the search bar
	 */
	Widget.prototype.closeSearchBar = function() {
		$(this.options.domSelectors.bar).removeClass(this.options.stateClasses.isOpen);

		this.options.searchBarIsOpen = false;

		$(window).trigger(events.close);

		$('body').removeClass('prevent-scroll');
	};

	/**
	 * Adding the single event listeners (one)
	 */
	Widget.prototype.addSingleEventListeners = function() {
		/**
		 * Additional single time events
		 */
		$(window).one('keydown.' + this.uuid, function() {
			if (event.keyCode === 27) {
				this.closeSearchBar();
			}
		}.bind(this));

		$('.layout_wrapper').one('click.' + this.uuid, function() {
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
