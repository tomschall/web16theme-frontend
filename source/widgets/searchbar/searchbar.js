/*!
 * page_search
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_Widgets/some/dependency.js
 */

function debounce(fn, delay) {
	'use strict';

	var timer = null;

	return function() {
		var context = this,
				args = arguments;

		clearTimeout(timer);

		timer = setTimeout(function() {
			fn.apply(context, args);
		}, delay);
	};
}

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
			searchEvents: {
				dataLoaded: 'dataLoaded.estatico.search'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		},
		resultsShown = false,
		currentSearchValue = null,
		searchBarIsOpen = false,
		searchPageUrl = 'test',
		jsonURL = '';

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
		jsonURL = this.$element.data('json-url');
		searchPageUrl = this.$element.data('searchpage-url');

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
			this.closeSearchBar(false);
		}.bind(this));

		$(window).on('openSearch.estatico.menubuttons.' + this.uuid, function() {
			this.openSearchBar();
		}.bind(this));

		$(window).on('closeSearch.estatico.menubuttons.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));

		$(this.options.domSelectors.input).keydown(debounce(function(event) {
			this.startSearch($(event.currentTarget));
		}.bind(this), 250));
	};

	Widget.prototype.startSearch = function($inputField) {
		var value = $inputField.val();

		this.removeSearchResults();

		if (value.length >= 3 && value !== currentSearchValue) {
			this.sendXHRObject(value);
		} else if (value.length === 0) {
			this.changeSearchbarStatus(this.options.stateClasses.showIntro);
		}
		window.estatico.search.updateSearchParameter('q', value);
		currentSearchValue = value;
	};

	/**
	 * Sends the xhr object to search module in global namespace
	 * @param _inputValue the input value
   */
	Widget.prototype.sendXHRObject = function(_inputValue) {
		var xhrObject = {
			q: _inputValue
		};

		window.estatico.search.search(xhrObject, true, false, false, jsonURL);

		this.changeSearchbarStatus(this.options.stateClasses.showLoader);

		$(window).on(this.options.searchEvents.dataLoaded, function(event, data, itemsTotal, unecessary2, category) {
			if (data) {
				this.showResults(data, category);
				if (itemsTotal) {
					// only add if there are some results
					this.appendGoToPageBtn();
				}

			} else {
				this.changeSearchbarStatus(this.options.stateClasses.showIntro);
			}
		}.bind(this));
	};

	/**
	 * Opens the search bar
	 */
	Widget.prototype.openSearchBar = function() {
		$(this.options.domSelectors.bar).addClass(this.options.stateClasses.isOpen);
		searchBarIsOpen = true;

		$(window).trigger(events.open);

		window.estatico.modal.addPreventScroll();
		window.estatico.modal.showModal();

		/**
		 * Have to set the timeout so focus can be set
		 */
		setTimeout(function() {
			$(this.options.domSelectors.input).focus();
		}.bind(this), 100);

		this.addSingleEventListeners();
		var searchParams = window.estatico.search.getSearchParameters();
		if (searchParams.q) {
			$(this.options.domSelectors.input).mouseup(function(e) {
				e.preventDefault();
			});

			$(this.options.domSelectors.input).one('focus', function() {
				$(this).select();
			});

			$(this.options.domSelectors.input).val(searchParams.q);
			$(this.options.domSelectors.input).trigger('keypress');
			$(this.options.domSelectors.input).focus();

			// invoke search
			this.startSearch($(this.options.domSelectors.input));
		}
	};

	/**
	 * Close the search bar
	 */
	Widget.prototype.closeSearchBar = function(removePreventScroll) {
		if (typeof removePreventScroll === typeof undefined) {
			removePreventScroll = true;
		}

		$(this.options.domSelectors.bar).removeClass(this.options.stateClasses.isOpen);

		searchBarIsOpen = false;

		$(window).trigger(events.close);

		if (removePreventScroll) {
			window.estatico.modal.hideModal();
			window.estatico.modal.removePreventScroll();
		}

		// remove query from url
		window.estatico.search.updateSearchParameter('q', '');
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

		$('.modal').one('click.' + this.uuid, function() {
			this.closeSearchBar();
		}.bind(this));
	};

	/**
	 * Show results
	 * @param html the generated html
   */
	Widget.prototype.showResults = function(html, category) {
		$(this.options.domSelectors.content).find('.mCSB_container .search__results span[data-category="' + category + '"]').after(html);

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

	// show all button on the bottom
	Widget.prototype.appendGoToPageBtn = function() {
		var completePageUrl = searchPageUrl + '?#=' + currentSearchValue,
            showAllResultsString = $(this.options.domSelectors.bar).data('lang-all-results'),
            $btn = $('<a class="widg_searchbar__go-to-page not-default" href="' + completePageUrl + '">' + showAllResultsString + '</a>');

		if ($('.widg_searchbar__go-to-page').length === 0) {
			$('.search__results').append($btn);
		}
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

			if ($elementTitle.length > 0) {
				titleSt = $elementTitle.html();
				titleSt = titleSt.replace('<span class="bold">', '');
				titleSt = titleSt.replace('</span>', '');

				queryStartPosition = titleSt.toLowerCase().search(currentSearchValue.toLowerCase());

				if (queryStartPosition !== -1) {
					queryEndPosition = queryStartPosition + currentSearchValue.length;

					markedTitle = titleSt.substr(0, queryStartPosition) + '<span class="bold">' + titleSt.substr(queryStartPosition, currentSearchValue.length) + '</span>' + titleSt.substr(queryEndPosition);

					$elementTitle.html(markedTitle);
				}
			}
		}.bind(this));
	};

	/**
	 * Remove search results
	 */
	Widget.prototype.removeSearchResults = function() {
		$(this.options.domSelectors.content).find('.search__results .search__cat').remove();

		// remove show all button as well
		$('.widg_searchbar__go-to-page').remove();
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
