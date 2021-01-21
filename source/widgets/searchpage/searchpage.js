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
        catPageResult: '.search__result--item',
			},
			domSelectorsSort: {
				sortAllSearchResults: '#sortAllSearchResults',
				sortNextExecutions: '#sortNextExecutions'
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
			FIRST_RESULT_SIZE: 10,
			RESULT_SIZE: 30,
		},
		data = {
			$formElements: null
		},
		searchParam = {},
		searchTemplate = '',
		searchCategory = '',
		expandedFilters = false,
		isCategorySearch = false,
		loadMoreMode = false,
		templatesWithoutMoreButton = ['expertises_full'],
		loadedEntries = 0,
		jsonURL = '',
		lastChangedFieldName = '',
		lastChangedFieldEvent = '',
		lastChangedFieldEventObj = {},
		removeAll = false,
		clicksObj = [
			0,
			1
		],
		sortObjProp = [
			'sortable_title',
			'start'
		],
		sortObj = {
			asc: 'ascending',
			desc: 'descending'
    },
    observer = {},
    lastReq = false;

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
      data: data,
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

		// debounce the search call invocation
		var sendSearchQueryDebounced = _.debounce(this._sendSearchQuery.bind(this), 250);

		this.sendSearchQuery = function(firstLoad, sortOn, sortOrder) {
			sortOn = sortOn || 'start';
			sortOrder = sortOrder || 'ascending';
			this.grabParameters(sortOn, sortOrder);
			sendSearchQueryDebounced(firstLoad);
		};
		this.checkFormFieldUnset = function() {
      if (lastChangedFieldEventObj && lastChangedFieldEventObj[lastChangedFieldName] === undefined) {
        return false;
      }

			if (lastChangedFieldName === 'search-string' || removeAll === true) {
				return true;
			}

			if (Object.keys(lastChangedFieldEventObj[lastChangedFieldName]).length < 2) {
				return false;
			}

			var lengthObj = Object.keys(lastChangedFieldEventObj[lastChangedFieldName]).length;

			var c = Object.keys(lastChangedFieldEventObj[lastChangedFieldName][lengthObj - 1]).length;
			var countTrue = 0;
			var countTrueCompare = 0;

			for (var i = 0; i < c; i++) {

				if (lastChangedFieldEventObj[lastChangedFieldName][lengthObj - 2][i] === true &&
					lastChangedFieldEventObj[lastChangedFieldName][lengthObj - 1][i] === false &&
					lastChangedFieldEvent.currentTarget[i].disabled === false) {
					countTrue++;
				}

				if (lastChangedFieldEventObj[lastChangedFieldName][lengthObj - 1][i] === true && lastChangedFieldEvent.target[i].disabled === false) {
					countTrueCompare++;
				}

			}

			if (countTrue === 1 && countTrueCompare === 0) {
				return true;
			}

			return false;

		};
		this.eventListeners();
		this.initQueryClearBtn();
    this.initSearchParam();
		this.searchAllFromSearchBar = Boolean(searchParam.sb);

		this.initFormFunctionality();

		if (searchTemplate === 'search_full') {
			this.fillFormAndTitle();
		} else {
			isCategorySearch = true;
			searchParam.template = searchTemplate;
			searchParam.category = searchCategory;
			this.fillForm();
    }

    if (searchTemplate === 'events_full' || searchTemplate === 'news_full') {
      this.grabParameters();
      searchParam.q = '';
      this.customizeFormSelectWidth();
    }

		if (typeof searchParam.q !== typeof undefined) {
			sendSearchQueryDebounced(true);
		}
  };

  Widget.prototype.customizeFormSelectWidth = function() {
    var $formElements = $('.search__form-wrapper .select2__wrapper:not(".hidden")');
    if ($formElements.length === 2) {
      $formElements.addClass('search__holder___double');
    } else if ($formElements.length === 1) {
      $formElements.addClass('search__holder___widest');
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
			this.sendSearchQuery(false, searchParam.sort_on, searchParam.sort_order);
			this._headerFixed = true;
			this._headerFixedReq = false;
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
		$formElements.on('change.' + this.uuid, function(event, remAll) {

			var nest = function(obj, keys, v) {
				if (keys.length === 1) {
					obj[keys[0]] = v;
				} else {
					var key = keys.shift();
					obj[key] = nest(typeof obj[key] === 'undefined' ? {} : obj[key], keys, v);
				}
				return obj;
			};

			if (remAll !== undefined) {
				removeAll = remAll;
			} else {
				removeAll = false;
			}

			lastChangedFieldName = event.target && event.target.name ? event.target.name : '';

			var index = 0;
			if (lastChangedFieldEventObj[event.target.name] !== null && lastChangedFieldEventObj[event.target.name] !== undefined) {
				index = Object.keys(lastChangedFieldEventObj[event.target.name]).length;
			}

			for (var i = 0; i < event.target.length; i++) {
				nest(lastChangedFieldEventObj, [event.target.name, index, i], event.target[i].selected);
			}

			lastChangedFieldEvent = event;

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

	/**
	 * Initializes the intersection observer for endless scrolling
	 */
	Widget.prototype.initIntersectionObserver = function() {
    observer.current = new IntersectionObserver(this.intersectionObserverCallback.bind(this));
    var ref = $('#loadMoreRef')[0];
    if (ref) {
      observer.current.observe(ref);
    }
  };

	/**
	 * Callback for intersection observer
	 */
	Widget.prototype.intersectionObserverCallback = function(entries) {
    if (entries[0].isIntersecting) {
      loadMoreMode = true;
      this.sendSearchQuery(false, searchParam.sort_on, searchParam.sort_order);
      this._headerFixed = true;
      this._headerFixedReq = false;
    }
	};

	Widget.prototype.updateQueryInputState = function() {

		// read current value from the field
		var val = $(this.options.domSelectors.queryInput).val().trim();
		$(this.options.domSelectors.queryInput).toggleClass(this.options.stateClasses.isFilled, Boolean(val.length));
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
	Widget.prototype.grabParameters = function(sortOn, sortOrder) {
		data.$formElements.map(function(index, element) {
			searchParam[$(element).data('searchparam')] = $(element).val();
		});
		if (searchParam.category === 'training') {
			searchParam.sort_on = sortOn;
			searchParam.sort_order = sortOrder;
		}
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
      if ($(element).is('input')) {
        $(element).val(null).trigger('change');
      } else if ($(element).is('select')) {
        if (((searchTemplate === 'events_full' || searchTemplate === 'news_full') &&
          !$(element).context.parentElement.classList.contains('hidden')) ||
          searchTemplate !== 'events_full' || searchTemplate !== 'news_full') {
            $(element).val(null).trigger('change');
        }
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

    if (lastReq === true) {
      delete searchParam.offset;
      delete searchParam.limit;
      lastReq = false;
    }

		window.estatico.search.setSearchParameters(searchParam);

		if (firstLoad && searchParam.offset) {
			// translate offset - internally
			searchParam.limit = parseInt(searchParam.offset, 10) + this.options.RESULT_SIZE;
			searchParam.offset = 0;
    }

		searchParam.limit = searchParam.offset ?
				this.options.RESULT_SIZE :
				this.options.FIRST_RESULT_SIZE;

		if (this.queryMatch()) {
			// avoid submission of the same query twice
			return false;
		}

		if (!loadMoreMode && !firstLoad) {
      this.removeSearchResults();
		}

		if (this.checkParameters()) {

      this.changeStatus(this.options.stateClasses.showLoading);

      var self = this;

      setTimeout(function() {
        window.estatico.search.search(searchParam, false, isCategorySearch, searchTemplate, jsonURL, firstLoad);

        if (isCategorySearch) {
          $(window).one(self.options.searchEvents.dataLoaded, self.handleData.bind(self));
        } else {
          $(window).on(self.options.searchEvents.dataLoaded, self.handleData.bind(self));
        }
      }, 500);

		} else {
			this.updateFilters('enableAll');
			this.$element.find('.search__table').remove();
			this.$element.find('.content__element').remove();
			this.$element.find('.widg_linklist').remove();
			$(this.options.domSelectors.moreResultsBtnWrapper).addClass(this.options.stateClasses.elementHidden);
			$(this.options.domSelectors.countNumber).closest('div').addClass(this.options.stateClasses.elementHidden);
		}

		return undefined;
	};

	Widget.prototype.handleData = function(event, local__data, foundEntries, limitedToResults, category, facets) {
		if (local__data) {
      this.showResults(local__data, foundEntries, limitedToResults, category);
      if (observer && observer.current) {
        observer.current.disconnect();
      }
      if (local__data[0].innerHTML !== '') {
        this.initIntersectionObserver();
      }
			if (isCategorySearch) {
        this.updateFilters(facets);
      }
      if (local__data[0].innerHTML === '') {
        lastReq = true;
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
			if (category === 'events' || category === 'news') {
        html = this.generateAdditionalTeasers(html);
				this.$element.find('.search__results .widg_linklist').append(html);
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
			this.addEventListenersForSorting();
		}

		loadedEntries = $(this.options.domSelectors.catPageResult).length;

		this.replaceLinkPlaceholder();
		this.markSearchQuery();
		this.addCatTitleLabel();
		this.changeStatus(this.options.stateClasses.showResults);

		if ($.inArray(searchTemplate, templatesWithoutMoreButton) >= 0) {
			$(this.options.domSelectors.moreResultsBtn).remove();
		}

		/**
		 * When there is a count number holder in the document
		 */

    if ($(this.options.domSelectors.countNumber).length === 1) {
      $(this.options.domSelectors.countNumber).html(foundEntries);
      var $currentDiv = $(this.options.domSelectors.countNumber).closest(
        'div'
      );

      if (foundEntries === 0) {
        $currentDiv
          .find('.search__countNumber___text')
          .text($('.search__lang-results').data('lang-no-results'));
        $(this.options.domSelectors.countNumber).addClass(
          this.options.stateClasses.elementHidden
        );
      } else if (foundEntries === 1) {
        $currentDiv
          .find('.search__countNumber___text')
          .text($('.search__lang-results').data('lang-singular'));
        $(this.options.domSelectors.countNumber).removeClass(
          this.options.stateClasses.elementHidden
        );
      } else {
        $currentDiv
          .find('.search__countNumber___text')
          .text($('.search__lang-results').data('lang-plural'));
        $(this.options.domSelectors.countNumber).removeClass(
          this.options.stateClasses.elementHidden
        );
      }

      $currentDiv.removeClass(this.options.stateClasses.elementHidden);

      /**
       * Temporary hide results counter in event and news search
       */

      if (searchTemplate === 'events_full' || searchTemplate === 'news_full') {
        $currentDiv.find('.search__countNumber___text').text('');
        $(this.options.domSelectors.countNumber).addClass(
          this.options.stateClasses.elementHidden
        );
      }
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
		return html.find('li');
	};

	/**
	 * Adds event listeners for sorting
	 */
	Widget.prototype.addEventListenersForSorting = function() {
		var a = 0;
		var cB = function(i) {
			var innerCB = function() {
				// Sorting - toggle ajax requests
				if (clicksObj[i] === 0) {
					clicksObj[i]++;
					this.sendSearchQuery(false, sortObjProp[i], sortObj.asc);
					this._headerFixed = false;
					this._headerFixedReq = false;
				} else {
					clicksObj[i]--;
					this.sendSearchQuery(false, sortObjProp[i], sortObj.desc);
					this._headerFixed = false;
					this._headerFixedReq = false;
				}
			}.bind(this);
			return innerCB;
		}.bind(this);

		for (var selector in this.options.domSelectorsSort) {
			if (!this.options.domSelectorsSort.hasOwnProperty(selector)) {
				continue;
			}
			var obj = this.options.domSelectorsSort[selector];
			$(obj).on('click.' + this.uuid, cB(a));
			a++;
		}
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
					markedTitle = titleSt.substr(0, queryStartPosition) + '<span class="bold">' +
							titleSt.substr(queryStartPosition, searchParam.q.length) + '</span>' +
							titleSt.substr(queryEndPosition);
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
			var check = this.checkFormFieldUnset(facets);

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
					$local__options = $field.find('option');

				$local__options.map(function(index, option) {

					if (fieldName === lastChangedFieldName && check !== true) {
						return;
					}

					if ($.inArray($(option).attr('value'), field.enable) === -1 && check !== true) {
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
    this.checkLabelHasSelection();
  };

  /**
	 * add class 'has-selection' if select is pre-selected
	 */
  Widget.prototype.checkLabelHasSelection = function() {
    var searchParamArr = [];
    if (searchTemplate === 'events_full') {
      searchParamArr = ['category', 'eventtype', 'location', 'school'];
    } else if (searchTemplate === 'news_full') {
      searchParamArr = ['school', 'date_from', 'date_to'];
    }
    if (searchParamArr.length) {
      searchParamArr.forEach(function(elem) {
        if (searchParam && searchParam[elem] !== null) {
          $('select#' + elem).next('span.select2.select2-container.select2-container--default').addClass('has-selection');
        }
      });
    }
  };

	/**
	 * Remove search results
	 */
	Widget.prototype.removeSearchResults = function() {
    if (searchTemplate === 'events_full' || searchTemplate === 'news_full') {
      this.$element.find('.search__results .search__cat, .search__results div').remove();
      return;
    }
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

		clone = $table.find('thead').clone(true, true).wrap('<table>').parent();
		clone.addClass('cloned').insertBefore($table);
		clone
			.hide()
			.css('position', 'fixed')
			.css('z-index', 1);
		resizeFixed();
		$(window).on('resize.' + this.uuid, resizeFixed);
		$(window).on('scroll.' + this.uuid, scrollFixed);
		if (!this._headerFixedReq) {
			scrollFixed();
		}
		this._headerFixed = true;
		this._headerFixedReq = true;
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
