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
				moreResultsBtnWrapper: '[data-' + name + '="moreResultsBtnWrapper"]',
				catPageResult: '.cat_page_result'
			},
			stateClasses: {
				isFilled: 'is_filled',
				showLoading: 'show_loading',
				showResults: 'show_results',
				isVisible: 'is_visible',
				isActive: 'is_active',
				elementHidden: 'element-hidden',
				isHidden: 'is_hidden'
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
		searchTemplate = '',
		searchCategory = '',
		expandedFilters = false,
		isCategorySearch = false,
		loadMoreMode = false,
		templatesWithoutMoreButton = ['expertises_full'],
		loadedEntries = 0,
		jsonURL = '',
		filterURL = '';

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
		searchTemplate = $(this.options.domSelectors.formWrapper).data('searchpage-template');
		searchCategory = $(this.options.domSelectors.formWrapper).data('searchpage-category');
		jsonURL = this.$element.data('json-url');
		filterURL = this.$element.data('filter-url');

		// debounce the search call invocation
		this.sendSearchQuery = _.debounce(this._sendSearchQuery.bind(this), 250);

		this.eventListeners();
		this.initFormFunctionality();
		this.initSearchParam();

		if (searchTemplate === 'search_full') {
			this.fillFormAndTitle();
		} else {
			isCategorySearch = true;

			searchParam.template = searchTemplate;
			searchParam.category = searchCategory;

			this.fillForm();
		}

		if (typeof searchParam.q !== typeof undefined) {
			this.sendSearchQuery();
		}

		var $clearQuery = $('<a href="#" class="search__string__clear"></a>');
		$(this.options.domSelectors.queryInput).parent().append($clearQuery);
		$clearQuery.click(function(event) {
			event.preventDefault();
			$(this).siblings('input').val('').change();
		})
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

		$(this.options.domSelectors.queryInput).on('input', function() {
			this.removeSearchResults();
			this.sendSearchQuery();

			if (searchTemplate === 'search_full') {
				this.updateTitle();
			}

			// this.sendSearchQuery();
			this.updateQueryInputState();
		}.bind(this));
		$(this.options.domSelectors.queryInput).change(this.updateQueryInputState.bind(this));


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
			this.removeSearchResults();
			this.sendSearchQuery();

			if (searchTemplate === 'search_full') {
				this.updateTitle();
			}
		}.bind(this));
	};

	/**
	 * Initializes the search param from search
	 */
	Widget.prototype.initSearchParam = function() {
		searchParam = window.estatico.search.getSearchParameters();
		if (searchParam.extended === 'true') {
			$(this.options.domSelectors.expanderBtn).trigger('click');
		}

		if (searchParam.si === 'true') {
			this.sendSearchQuery();
		}
	};

	Widget.prototype.updateQueryInputState = function() {

		// read current value from the field
		var val = $(this.options.domSelectors.queryInput).val().trim();
		$(this.options.domSelectors.queryInput).toggleClass(this.options.stateClasses.isFilled, !!val.length);
	};

	/**
	 * Initializes the form and the title
	 */
	Widget.prototype.fillFormAndTitle = function() {
		$(this.options.domSelectors.queryInput).val(searchParam.q);
		this.updateQueryInputState();
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
		var key;

		// first set value to all fields - can not trigger change event here
		// as not all values are set yet
		for (key in searchParam) {
			if (searchParam.hasOwnProperty(key)) {
				$('[data-searchparam="' + key + '"]').val(searchParam[key]);
			}
		}

		// next trigger change event on all fields
		for (key in searchParam) {
			if (searchParam.hasOwnProperty(key)) {
				$('[data-searchparam="' + key + '"]').trigger('change');
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
				arrayWithNoneParams = ['category','offset', 'template'];

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
		window.estatico.search.setSearchParameters({});
		data.$formElements.map(function(index, element) {
			$(element).val('').trigger('change');

			if ($(element).is('select')) {
				$(element).select2('destroy');
				window.estatico.easyFormValidation.select2Init();
			}
		});
	};

	/**
	 * Sends the complete xhr request to search
   */
	Widget.prototype._sendSearchQuery = function() {
		this.grabParameters();

		if (loadMoreMode) {
			searchParam.offset = $(this.options.domSelectors.catPageResult).length;
		}

		if (this.checkParameters()) {
			window.estatico.search.search(searchParam, false, isCategorySearch, searchTemplate, jsonURL);

			if (!loadMoreMode) {
				this.changeStatus(this.options.stateClasses.showLoading);
			}

			if (isCategorySearch) {
				$(window).one(this.options.searchEvents.dataLoaded, function(event, data, foundEntries, limitedToResults, category, facets) {
					if (data) {
						this.showResults(data, foundEntries, limitedToResults, category);

						if (isCategorySearch) {
							this.updateFilters(facets);
						}
					} else {
						this.changeStatus(this.options.stateClasses.showResults);
					}

				}.bind(this));
			} else {
				$(window).on(this.options.searchEvents.dataLoaded, function(event, data, foundEntries, limitedToResults, category, facets) {
					if (data) {
						this.showResults(data, foundEntries, limitedToResults, category);

						if (isCategorySearch) {
							this.updateFilters(facets);
						}
					} else {
						this.changeStatus(this.options.stateClasses.showResults);
					}
				}.bind(this));
			}

		} else {
			this.updateFilters('enableAll');
			this.$element.find('.search__table').remove();
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
			$(this.options.domSelectors.countNumber).closest('div').addClass(this.options.stateClasses.elementHidden);
		}
	};

	/**
	 * Show results
	 * @param html the generated html
	 * @param foundEntries the integer with the number of found entries
	 * @param limitedToResults the number of to which the entries are limited
	 */
	Widget.prototype.showResults = function(html, foundEntries, limitedToResults, category) {
		if (loadMoreMode) {
			if (category === 'events') {
				html = this.generateAdditionalTeasers(html);

				this.$element.find('.search__results .widg_teaser__wrapper').append(html);
			} else {
				html = this.generateAdditionalTableHTML(html);

				this.$element.find('.search__results table').append(html);
			}

			// Reset the load more mode to false
			loadMoreMode = false;
		} else {
			this.$element.find('.search__table').remove();
			this.$element.find('.search__results span[data-category="' + category + '"]').after(html);
		}

		loadedEntries = $(this.options.domSelectors.catPageResult).length;

		this.replaceLinkPlaceholder();
		this.markSearchQuery();
		this.addCatTitleLabel();

		this.changeStatus(this.options.stateClasses.showResults);

		resultsShown = true;

		if ($.inArray(searchTemplate, templatesWithoutMoreButton) >= 0) {
			$(this.options.domSelectors.moreResultsBtn).remove();
		}

		/**
		 * When there is a count number holder in the document
		 */
		if ($(this.options.domSelectors.countNumber).length === 1) {
			$(this.options.domSelectors.countNumber).html(foundEntries);
			var $currentDiv = $(this.options.domSelectors.countNumber).closest('div');

			if (foundEntries === 0) {
				$currentDiv.find('.search__countNumber___text').text($('.search__lang-results').data('lang-no-results'));
				$(this.options.domSelectors.countNumber).addClass(this.options.stateClasses.elementHidden);
			} else if (foundEntries === 1) {
				$currentDiv.find('.search__countNumber___text').text($('.search__lang-results').data('lang-singular'));
				$(this.options.domSelectors.countNumber).removeClass(this.options.stateClasses.elementHidden);
			} else {
				$currentDiv.find('.search__countNumber___text').text($('.search__lang-results').data('lang-plural'));
				$(this.options.domSelectors.countNumber).removeClass(this.options.stateClasses.elementHidden);
			}

			$currentDiv.removeClass(this.options.stateClasses.elementHidden);
		}

		/**
		 * When the results which where returned are limited
		 */

		if (typeof limitedToResults !== typeof undefined && loadedEntries < foundEntries) {
			$(this.options.domSelectors.moreResultsBtnWrapper).removeClass(this.options.stateClasses.elementHidden);

		} else if (loadedEntries >= foundEntries) {
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);

		} else {
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
		}

		this.$element.find('.fhnw-spinner').css({
			'min-height': $('.search__results').height()
		});

		var $resultsTd = $('.search__results td');

		$resultsTd.unbind('click.' + this.uuid);

		/**
		 * Adding the event to add link functionality to search results
		 */
		$resultsTd.on('click.' + this.uuid, function(event) {
			var $row = $(event.currentTarget).closest('tr'),
					url = $row.find('a').attr('href');

			window.location = url;
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

	Widget.prototype.generateAdditionalTeasers = function(html) {
		var $html = html.find('.widg_teaser__wrapper').html();

		return $html;
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

	Widget.prototype.updateFilters = function(facets) {
		if (facets === 'enableAll') {
			var $options = $('option');

			$options.map(function(index, option) {
				$(option).removeAttr('disabled');
			});
		} else if (facets) {
			facets.forEach(function(field) {
				var $field = $('[data-searchparam="' + field.field + '"]'),
						$options = $field.find('option');

				$options.map(function(index, option) {
					if ($.inArray($(option).attr('value'), field.enable) === -1) {
						$(option).attr('disabled', 'disabled');
					} else {
						$(option).removeAttr('disabled');
					}
				}.bind(this));
			}.bind(this));
		}

		$('.custom-select').select2('destroy');

		window.estatico.easyFormValidation.select2Init();
	};

	/**
	 * Remove search results
	 */
	Widget.prototype.removeSearchResults = function() {
		this.$element.find('.search__results .search__cat, .search__results table').remove();
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
