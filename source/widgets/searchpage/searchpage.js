/*!
 * Searchpage
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'searchpage',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				queryInput: '[data-' + name + '="query"]',
				btn: '[data-' + name + '="btn"]',
				title: '[data-' + name + '="title"]'
			},
			stateClasses: {
				isFilled: 'is_filled',
				showLoading: 'show_loading',
				showResults: 'show_results'
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
		searchParam = {},
		resultsShown = false;

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
		this.initSearchParam();
		this.initFormAndTitle();
		this.sendXHRObject();

		this.eventListeners();
	};

	/**
	 * Adds the event listeners
	 */
	Widget.prototype.eventListeners = function() {
		$(this.options.domSelectors.btn).on('click.' + this.uuid, function() {
			this.sendXHRObject();
		}.bind(this));

		$(this.options.domSelectors.queryInput).on('change.' + this.uuid, function(event) {
			searchParam.q = $(event.target).val();
		});
	};

	/**
	 * Initializes the search param from search
	 */
	Widget.prototype.initSearchParam = function() {
		searchParam = window.estatico.search.getSearchParameters();
	};

	/**
	 * Initializes the form and the title
	 */
	Widget.prototype.initFormAndTitle = function() {
		$(this.options.domSelectors.queryInput).addClass(this.options.stateClasses.isFilled).val(searchParam.q);

		$(this.options.domSelectors.title).text(this.$element.data('lang-title') + ' «' + searchParam.q + '»');
	};

	/**
	 * Sends the complete xhr request to search
	 * @param _inputValue
   */
	Widget.prototype.sendXHRObject = function() {
		window.estatico.search.search(searchParam, false);

		this.changeStatus(this.options.stateClasses.showLoading);

		$(window).one(this.options.searchEvents.dataLoaded, function(event, data) {
			this.showResults(data);
		}.bind(this));
	};

	/**
	 * Show results
	 * @param html the generated html
	 */
	Widget.prototype.showResults = function(html) {
		if (resultsShown) {
			this.$element.find('.search__results').remove();
		}

		this.$element.append(html);

		this.markSearchQuery();
		this.addCatTitleLabel();

		this.changeStatus(this.options.stateClasses.showResults);

		resultsShown = true;
	};

	/**
	 * Change the current Status
	 * @param newState
   */
	Widget.prototype.changeStatus = function(newState) {
		this.$element.attr('class', function(index, css) {
			return css.replace(/(^|\s)show_\S+/g, '');
		});

		this.$element.addClass(newState);
	};

	/**
	 * Marks the search query
	 */
	Widget.prototype.markSearchQuery = function() {
		var $searchbarContent = this.$element,
				$searchResultLists = $searchbarContent.find('li'),
				$elementTitle = null,
				titleSt = '',
				queryStartPosition = 0,
				queryEndPosition = 0,
				markedTitle = null;

		$searchResultLists.each(function(index, element) {
			$elementTitle = $(element).find('a .' + this.options.listItemSpanClasses.title);
			titleSt = $elementTitle.html();

			queryStartPosition = titleSt.toLowerCase().search(searchParam.q.toLowerCase());

			if (queryStartPosition !== -1) {
				queryEndPosition = queryStartPosition + searchParam.q.length;

				markedTitle = titleSt.substr(0, queryStartPosition) + '<span class="bold">' + titleSt.substr(queryStartPosition, searchParam.q.length) + '</span>' + titleSt.substr(queryEndPosition);

				$elementTitle.html(markedTitle);
			}
		}.bind(this));
	};

	/**
	 * Adds the label "all" to the category title
	 */
	Widget.prototype.addCatTitleLabel = function() {
		var $catTitles = $('a.search__cat-title');

		$catTitles.each(function(index, element) {
			$(element).append('<span class="search__cat-title-label">' + this.$element.data('lang-all') + '</span>');
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
