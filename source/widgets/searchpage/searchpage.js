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
		},
		defaults = {
			domSelectors: {
				queryInput: '[data-' + name + '="query"]',
				btn: '[data-' + name + '="btn"]',
				title: '[data-' + name + '="title"]',
				formWrapper: '[data-' + name + '="formWrapper"]',
				expanderBtn: '[data-' + name + '="extendBtn"]',
				resetBtn: '[data-' + name + '="reset"]',
				expandedFilters: '[data-' + name + '="expandedFilters"]',
				tdURL: '[data-' + name + '="url"]',
				countNumber: '[data-' + name + '="countNumber"]',
				moreResultsBtn: '[data-' + name + '="moreResultsBtn"]',
				moreResultsBtnWrapper: '[data-' + name + '="moreResultsBtnWrapper"]'
			},
			stateClasses: {
				isFilled: 'is_filled',
				showLoading: 'show_loading',
				showResults: 'show_results',
				isVisible: 'is_visible',
				isActive: 'is_active',
				elementHidden: 'element-hidden'
			},
			listItemSpanClasses: {
				title: 'title'
			},
			searchEvents: {
				dataLoaded: 'dataLoaded.estatico.search',
				updateFilterLoaded: 'updateFilterLoaded.estatico.search'
			}
		},
		data = {
			$formElements: null
		},
		searchParam = {},
		resultsShown = false,
		searchType = '',
		expandedFilters = false,
		isCategorySearch = false,
		loadMoreMode = false,
		currentLimitOffset = 0;

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
		searchType = $(this.options.domSelectors.formWrapper).data('searchpage-type');

		this.initFormFunctionality();

		this.initSearchParam();

		if (searchType === 'all') {
			this.fillFormAndTitle();
		} else {
			isCategorySearch = true;

			searchParam.category = searchType;

			this.fillForm();
		}

		if (typeof searchParam.q !== typeof undefined) {
			this.sendSearchQuery();
		}

		this.eventListeners();
	};

	/**
	 * Adds the event listeners
	 */
	Widget.prototype.eventListeners = function() {
		/**
		 * When clicking on search query
		 */
		$(this.options.domSelectors.btn).on('click.' + this.uuid, function() {
			this.sendSearchQuery();
		}.bind(this));

		/**
		 * Expander btn to show more filters
		 */
		$(this.options.domSelectors.expanderBtn).on('click.' + this.uuid, function(event) {
			expandedFilters = !expandedFilters;

			$(this.options.domSelectors.expandedFilters).toggleClass(this.options.stateClasses.isVisible);

			$(event.currentTarget).toggleClass(this.options.stateClasses.isActive);
		}.bind(this));

		/**
		 * Load more results to the table when limited results
		 */
		$(this.options.domSelectors.moreResultsBtn).on('click.' + this.uuid, function() {
			loadMoreMode = true;

			this.sendSearchQuery();
		}.bind(this));

		/**
		 * Functionality for the reset btn
		 */
		$(this.options.domSelectors.resetBtn).on('click.' + this.uuid, function() {
			this.resetFields();
		}.bind(this));
	};

	Widget.prototype.initFormFunctionality = function() {
		var $formElements = $('.search__form-wrapper input:not(".select2-search__field"), .search__form-wrapper select');

		data.$formElements = $formElements;

		$formElements.on('change.' + this.uuid, function() {
			this.sendSearchQuery();

			if (searchType === 'all') {
				this.updateTitle();
			}
		}.bind(this));
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
	Widget.prototype.fillFormAndTitle = function() {
		$(this.options.domSelectors.queryInput).addClass(this.options.stateClasses.isFilled).val(searchParam.q);

		this.updateTitle();
	};

	/**
	 * Updates the title
	 */
	Widget.prototype.updateTitle = function() {
		$(this.options.domSelectors.title).text(this.$element.data('lang-title') + ' «' + searchParam.q + '»');

	};

	/**
	 * Fills the form with the get parameters
	 */
	Widget.prototype.fillForm = function() {
		for (var key in searchParam) {
			if (searchParam.hasOwnProperty(key)) {
				$('[data-searchparam="' + key + '"]').val(searchParam[key]).trigger('change');
			}
		}
	};

	/**
	 * Grab parameters from form fields
	 */
	Widget.prototype.grabParameters = function() {
		data.$formElements.map(function(index, element) {
			searchParam[$(element).data('searchparam')] = $(element).val();
		});
	};

	/**
	 * Function to avoid making a request when nothing is actually selected
	 */
	Widget.prototype.checkParameters = function() {
		var properParamCounter = 0,
				arrayWithNoneParams = ['category','offset'];

		for (var key in searchParam) {
			if ($.inArray(key, arrayWithNoneParams) === -1) {
				var value = searchParam[key];

				if (value !== '' && value !== null) {
					properParamCounter++;
				}
			}
		}

		return properParamCounter > 0;
	};

	/**
	 * Resetting all form fields
	 */
	Widget.prototype.resetFields = function() {
		data.$formElements.map(function(index, element) {
			$(element).val('');

			if ($(element).is('select')) {
				$(element).select2('destroy');

				window.estatico.formElementHelper.initSelect2();
			}

		});
	};

	/**
	 * Sends the complete xhr request to search
   */
	Widget.prototype.sendSearchQuery = function() {
		this.grabParameters();

		if (loadMoreMode) {
			searchParam.offset = currentLimitOffset;
		}

		if (isCategorySearch) {
			window.estatico.search.updateFilter(searchParam);

			$(window).one(this.options.searchEvents.updateFilterLoaded, function(event, data) {
				this.updateFilters(data.response);
			}.bind(this));
		}

		if (this.checkParameters()) {
			window.estatico.search.search(searchParam, false, isCategorySearch);

			if (!loadMoreMode) {
				this.changeStatus(this.options.stateClasses.showLoading);
			}

			$(window).one(this.options.searchEvents.dataLoaded, function(event, data, foundEntries, limitedToResults) {
				this.showResults(data, foundEntries, limitedToResults);
			}.bind(this));
		}
	};

	/**
	 * Show results
	 * @param html the generated html
	 * @param foundEntries the integer with the number of found entries
	 * @param limitedToResults the number of to which the entries are limited
	 */
	Widget.prototype.showResults = function(html, foundEntries, limitedToResults) {
		var $resultsTd = $('.search__results td');

		if (resultsShown && !loadMoreMode) {
			this.$element.find('.search__results').remove();
		}

		if (loadMoreMode) {
			html = this.generateAdditionalTableHTML(html);

			this.$element.find('.search__results').append(html);

			// Reset the load more mode to false
			loadMoreMode = false;
		} else {
			$(this.options.domSelectors.moreResultsBtnWrapper).before(html);
		}

		this.replaceLinkPlaceholder();
		this.markSearchQuery();
		this.addCatTitleLabel();

		this.changeStatus(this.options.stateClasses.showResults);

		resultsShown = true;

		/**
		 * When there is a count number holder in the document
		 */
		if ($(this.options.domSelectors.countNumber).length === 1) {
			$(this.options.domSelectors.countNumber).html(foundEntries);
			$(this.options.domSelectors.countNumber).closest('div').removeClass(this.options.stateClasses.elementHidden);
		}

		/**
		 * When the results which where returned are limited
		 */
		if (typeof limitedToResults !== typeof undefined) {
			$(this.options.domSelectors.moreResultsBtnWrapper).removeClass(this.options.stateClasses.elementHidden);

			currentLimitOffset = limitedToResults;
		} else {
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);

			currentLimitOffset = 0;
		}

		this.$element.find('.fhnw-spinner').css({
			'min-height': $('.search__results').height()
		});

		$resultsTd.unbind('click.' + this.uuid);

		/**
		 * Adding the event to add link functionality to search results
		 */
		$resultsTd.on('click.' + this.uuid, function(event) {
			var $row = $(event.currentTarget).closest('tr'),
					url = $row.find('a').attr('href');

			window.location = location.origin + '/' + url;
		}.bind(this));
	};

	/**
	 * Takes only the rows without headers from the generated html
	 * @param html
	 * @returns {*}
   */
	Widget.prototype.generateAdditionalTableHTML = function(html) {
		return html.find('tr').not(':eq(0)');
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

			if ($elementTitle.hasClass('title')) {
				queryStartPosition = titleSt.toLowerCase().search(searchParam.q.toLowerCase());

				if (queryStartPosition !== -1) {
					queryEndPosition = queryStartPosition + searchParam.q.length;

					markedTitle = titleSt.substr(0, queryStartPosition) + '<span class="bold">' + titleSt.substr(queryStartPosition, searchParam.q.length) + '</span>' + titleSt.substr(queryEndPosition);

					$elementTitle.html(markedTitle);
				}
			}
		}.bind(this));
	};

	Widget.prototype.replaceLinkPlaceholder = function() {
		var linkString = this.$element.data('lang-link'),
				$linksInCell = $(this.options.domSelectors.tdURL + ' a');

		$linksInCell.each(function(index, element) {
			$(element).html(linkString);
		});
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

	Widget.prototype.updateFilters = function(response) {
		response.forEach(function(field) {
			var $field = $('[data-searchparam="' + field.field + '"]'),
					$options = $field.find('option');

			$options.map(function(index, option) {
				if ($.inArray($(option).attr('value'), field.disable) !== -1) {
					$(option).attr('disabled', 'disabled');
				}
			}.bind(this));

			$field.select2('destroy');
		}.bind(this));

		window.estatico.formElementHelper.initSelect2();
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