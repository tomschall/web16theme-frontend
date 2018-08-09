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
				catPageResult: '.search__result--item'
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
			},
			RESULT_SIZE: 5
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
		filterURL = '',
		lastChangedFieldName = '';

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
		var sendSearchQueryDebounced = _.debounce(this._sendSearchQuery.bind(this), 250);

		this.sendSearchQuery = function() {
			this.grabParameters();
			sendSearchQueryDebounced();
		};
		this.eventListeners();
		this.initQueryClearBtn();
		this.initSearchParam();

		// #669 - when coming from the search bar page, hide the search all button
		this.searchAllFromSearchBar = !!searchParam.sb;

		this.initFormFunctionality();

		if (searchTemplate === 'search_full') {
			this.fillFormAndTitle();
		} else {
			isCategorySearch = true;
			searchParam.template = searchTemplate;
			searchParam.category = searchCategory;
			this.fillForm();
		}

		if (typeof searchParam.q !== typeof undefined) {
			sendSearchQueryDebounced(true);
		}
	};

	Widget.prototype.initQueryClearBtn = function() {
		this.$clearQueryBtn = $('<a href="#" class="search__string__clear"></a>').hide();
		$(this.options.domSelectors.queryInput).parent().append(this.$clearQueryBtn);
		this.$clearQueryBtn.click(function(event) {
			event.preventDefault();
			$(this).siblings('input').val('').change();
		});
	};

	/**
	 * Adds the event listeners
	 */
	Widget.prototype.eventListeners = function() {
		// When clicking on search query
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
			this.sendSearchQuery();
			if (searchTemplate === 'search_full') {
				this.updateTitle();
			}
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
		$formElements.on('change.' + this.uuid, function(event) {
			lastChangedFieldName = event.target && event.target.name ? event.target.name : '';
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
		this.$clearQueryBtn[val ? 'show' : 'hide']();
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
		$(this.options.domSelectors.title).text(this.$element.data('lang-title') + ' «' + (searchParam.q || '') + '»');
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
			arrayWithNoneParams = ['category', 'offset', 'template'];

		for (var key in searchParam) {
			if ($.inArray(key, arrayWithNoneParams) === -1) {
				var value = searchParam[key];

				if (value !== '' && value !== null && (key !== 'q' || value.length >= 3)) {
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

	Widget.prototype.queryMatch = function() {
		var same = _.isEqual(searchParam, this._lastSearchParam);
		this._lastSearchParam = _.clone(searchParam);
		return same;
	};

	/**
	 * Sends the complete xhr request to search
   */
	Widget.prototype._sendSearchQuery = function(firstLoad) {
		if (loadMoreMode) {
			delete searchParam.limit; // remove limit
			searchParam.offset = $(this.options.domSelectors.catPageResult).length; // offset counts from 0
		} else if (!firstLoad) {
			delete searchParam.offset;
			delete searchParam.limit;
		}
		window.estatico.search.setSearchParameters(searchParam);

		if (firstLoad && searchParam.offset) {
			// translate offset - internally
			searchParam.limit = parseInt(searchParam.offset) + this.options.RESULT_SIZE;
			searchParam.offset = 0;
		}

		if (this.queryMatch()) {
			// avoid submission of the same query twice
			return false;
		}

		if (!loadMoreMode && !firstLoad) {
			this.removeSearchResults();
		}

		if (this.checkParameters()) {
			window.estatico.search.search(searchParam, false, isCategorySearch, searchTemplate, jsonURL, firstLoad);

			if (!loadMoreMode) {
				this.changeStatus(this.options.stateClasses.showLoading);
			}

			if (isCategorySearch) {
				$(window).one(this.options.searchEvents.dataLoaded, this.handleData.bind(this));
			} else {
				$(window).on(this.options.searchEvents.dataLoaded, this.handleData.bind(this));
			}
		} else {
			this.updateFilters('enableAll');
			this.$element.find('.search__table').remove();
			this.$element.find('.content__element').remove();
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
			$(this.options.domSelectors.countNumber).closest('div').addClass(this.options.stateClasses.elementHidden);
		}

		return undefined;
	};

	Widget.prototype.handleData = function(event, data, foundEntries, limitedToResults, category, facets) {
		if (data) {
			this.showResults(data, foundEntries, limitedToResults, category);
			if (isCategorySearch) {
				this.updateFilters(facets);
			}
		} else {
			this.changeStatus(this.options.stateClasses.showResults);
		}

		if (window.estatico.mq.query({from: 'subnav'})) {
			this.fixResultsHeader(this.$element.find('table'));
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
			} else if (estatico.search.RENDER_AS_LIST_ITEMS.indexOf(category) >= 0) {
				this.$element.find('.search__cat ul').append(html.find('li'));
			} else {
				html = this.generateAdditionalTableHTML(html);
				this.$element.find('.search__results table:not(.cloned)').append(html);
			}

			// Reset the load more mode to false
			loadMoreMode = false;
		} else {
			this.$element.find('.content__element').remove();
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
		} else {
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
		}

		if (this.searchAllFromSearchBar) {
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
			if ($(event.target).is('a')) {
				return;
			}
			var $row = $(event.currentTarget).closest('tr');
			window.location = $row.find('a').attr('href');
		});
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
			var facetsToItemsFieldnames = {
				'faculty': 'taxonomy_subjectarea',
				'study_type': 'taxonomy_eduproducttype',
				'location': 'city'
			};
			facets.forEach(function(field) {
				// field names coming from the endpoint are postfixed with [] if they contain lists
				// removes postfix from the name
				var fieldName = facetsToItemsFieldnames[field.field.replace(/\[\]$/, '')],
					$field = $('[data-searchparam="' + fieldName + '"]'),
					$options = $field.find('option');
				$options.map(function(index, option) {
					if ($field.val() === $(option).val() ||
							fieldName === lastChangedFieldName) {
						return;
					}

					if ($.inArray($(option).attr('value'), field.enable) === -1) {
						$(option).attr('disabled', 'disabled');
					} else {
						$(option).removeAttr('disabled');
					}
				});
				$field.find('optgroup').remove(); // remove all opt groups
			});
		}
		$('.custom-select').select2('destroy');
		window.estatico.easyFormValidation.select2Init();
	};

	/**
	 * Remove search results
	 */
	Widget.prototype.removeSearchResults = function() {
		$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
		this.$element.find('.search__results .search__cat, .search__results table').remove();
	};

	/**
	 * Enforces fixed table header on scroll
	 *
	 * @param {HTMLTableElement} $table Result table
	 */
	Widget.prototype.fixResultsHeader = function($table) {
		var clone;

		function resizeFixed() {
			clone.width($table.width());
			clone.find('th').each(function(index) {
				$(this).css('width', $table.find('tr:first-child td').eq(index).outerWidth() + 'px');
			});
		}

		function scrollFixed() {
			var fixedHeight = $('.search__form-wrapper.scroll-to-fixed-fixed').outerHeight(),
				offset = $(window).scrollTop() + fixedHeight,
				tableOffsetTop = $table.offset().top,
				tableOffsetBottom = tableOffsetTop + $table.height() - $table.find('thead').height();

			clone.css('top', fixedHeight);

			if (offset < tableOffsetTop || offset > tableOffsetBottom) {
				clone.hide();
			} else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && clone.is(':hidden')) {
				clone.show();
			}
		}

		if (this._headerFixed || $table.find('thead').size() === 0) {
			return;
		}

		clone = $table.find('thead').clone().wrap('<table>').parent();
		clone.addClass('cloned').insertBefore($table);
		clone
			.hide()
			.css('position', 'fixed')
			.css('z-index', 1);
		resizeFixed();
		$(window).on('resize.' + this.uuid, resizeFixed);
		$(window).on('scroll.' + this.uuid, scrollFixed);
		this._headerFixed = true;
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);
		$(window).off('.' + this.uuid);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);
