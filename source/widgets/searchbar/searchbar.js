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
				input: '[data-' + name + '="input"]',
				intro: '[data-' + name + '="intro"]',
				loader: '[data-' + name + '="loader"]',
				content: '[data-' + name + '="content"]'
			},
			stateClasses: {
				isOpen: 'is_open',
				showLoader: 'show-loader',
				showIntro: 'show-intro',
				showResults: 'show-results'
			},
			listItemSpanClasses: {
				title: 'title'
			},
			resultsShown: false,
			searchEvents: {
				dataLoaded: 'dataLoaded.estatico.search'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		},
		resultsShown = false,
		currentSearchValue = null,
		searchBarIsOpen = false;

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
			if (searchBarIsOpen) {
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

			if (value.length >= 3 && value !== currentSearchValue) {
				this.sendXHRObject($(event.currentTarget).val());
			} else if (value.length === 0) {
				this.changeSearchbarStatus(this.options.stateClasses.showIntro);

				this.removeSearchResults();
			}

			currentSearchValue = value;

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

		this.changeSearchbarStatus(this.options.stateClasses.showLoader);

		$(window).one(this.options.searchEvents.dataLoaded, function(event, data) {
			this.showResults(data);
		}.bind(this));
	};

	/**
	 * Opens the search bar
	 */
	Widget.prototype.openSearchBar = function() {
		$(this.options.domSelectors.bar).addClass(this.options.stateClasses.isOpen);
		searchBarIsOpen = true;

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

		searchBarIsOpen = false;

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
	 * Show results
	 * @param html the generated html
   */
	Widget.prototype.showResults = function(html) {
		if (resultsShown) {
			$(this.options.domSelectors.content).find('.search__results').remove();
		}

		$(this.options.domSelectors.content).find('.mCSB_container').append(html);

		this.changeSearchbarStatus(this.options.stateClasses.showResults);

		this.markSearchQuery();

		$(this.options.domSelectors.content).css({
			'height': $(this.options.domSelectors.content).height()
		});

		resultsShown = true;
	};

	/**
	 * Change searchbar status
	 */
	Widget.prototype.changeSearchbarStatus = function(newState) {
		$(this.options.domSelectors.bar).attr('class', function(index, css) {
			return css.replace(/(^|\s)show-\S+/g, '');
		});

		$(this.options.domSelectors.bar).addClass(newState);

	};

	/**
	 * Marks the search query
	 */
	Widget.prototype.markSearchQuery = function() {
		var $searchbarContent = $(this.options.domSelectors.content),
				$searchResultLists = $searchbarContent.find('li'),
				$elementTitle = null,
				titleSt = '',
				queryStartPosition = 0,
				queryEndPosition = 0,
				markedTitle = null;

		$searchResultLists.each(function(index, element) {
			$elementTitle = $(element).find('a .' + this.options.listItemSpanClasses.title);
			titleSt = $elementTitle.html();

			queryStartPosition = titleSt.toLowerCase().search(currentSearchValue.toLowerCase());

			if (queryStartPosition !== -1) {
				queryEndPosition = queryStartPosition + currentSearchValue.length;

				markedTitle = titleSt.substr(0, queryStartPosition) + '<span class="bold">' + titleSt.substr(queryStartPosition, currentSearchValue.length) + '</span>' + titleSt.substr(queryEndPosition);

				$elementTitle.html(markedTitle);
			}
		}.bind(this));
	};

	/**
	 * Remove search results
	 */
	Widget.prototype.removeSearchResults = function() {
		$(this.options.domSelectors.content).find('.search__results').remove();
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
