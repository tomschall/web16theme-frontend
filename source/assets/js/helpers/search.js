/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

var fieldDictionaries = {
	taxonomy_subjectarea: {},
	taxonomy_eduproducttype: {},
	city: {}
};


;(function($, undefined) {
	'use strict';

	var RENDER_AS_LIST_ITEMS = [
		'documents',
		'irf',
		'web',
		'sonst'
	],
	events = {
			dataLoaded: 'dataLoaded.estatico.search',
			updateFilterLoaded: 'updateFilterLoaded.estatico.search'
		},

		listHeadTemplates = {
			categorySearch: {
				training: '<tr><th>{{title}}</th><th>{{study_type}}</th><th>{{faculty}}</th><th>{{location}}</th></tr>',
				studies: '<tr><th>{{title}}</th><th>{{study_type}}</th><th>{{faculty}}</th><th>{{location}}</th></tr>',
			}
		},

		listEntryTemplates = {
			searchbar: {
				normal: '<li class="search__result-normal search__result--item"><a href="{{combinedURL}}"><span class="title">{{{Title}}}</span></a><span class="search__result-arrow"></span></li>',
				event: '<li class="search_result search__result-event search__result--item"><a href="{{combinedURL}}"><span class="title">{{{Title}}}</span><span class="event-info">{{start}}</span></a><span class="search__result-arrow"></span></li>',
				doc: '<li class="search_result search__result-doc search__result--item"><a href="{{combinedURL}}"><span class="title">{{{Title}}}<span class="visible-in-bar">({{mimeType}})</span></span><span class="file-type visible-in-page">{{mimeType}}</span></a></li>',
				webservices: '<li class="search_result search__result-normal search__result--item"><a href="{{combinedURL}}"><span class="title">{{{Title}}}</span></a><span class="search__result-arrow"></span></li>',
				irf: '<li class="search__result-normal search__result--item"><a href="{{combinedURL}}"><span class="title">{{{Title}}}</span></a><span class="search__result-arrow"></span></li>'
			},

			categorySearch: {
				training: '<tr class="cat_page_result search__result--item" data-clickable="true" ><td class="search__cell search__cell-title"><a href="{{combinedURL}}" class="search__cell-anchor">{{Title}}</a></td><td>{{#get_taxonomy_eduproducttype}}{{taxonomy_eduproducttype}}{{/get_taxonomy_eduproducttype}}</td><td>{{#get_taxonomy_subjectarea}}{{taxonomy_subjectarea}}{{/get_taxonomy_subjectarea}}</td><td>{{#get_city}}{{city}}{{/get_city}}</td><td data-searchpage="url"><a href="{{combinedURL}}"></a><span class="search__result-arrow"></span></td></tr>',
				expertises: '<div class="cat_page_result search__result--item" data-clickable="true" class="search__result-word-list"><a href="{{combinedURL}}">{{Title}}<span class="search__result-arrow"></span></a></div>',
				profiles: '<tr class="cat_page_result cat_page_profile_result search__result--item" data-clickable="false"><td>{{#if combinedURL}}<img src="{{combinedURL}}/@@images/portrait_foto/f_search" alt="{{Title}}"/>{{/if}}</td><td><div><h4>{{Title}}</h4></div><div>{{fa_expertise}}</div><a class="button__secondary" href="{{combinedURL}}">{{to-profile}}</a></td><td><div class="search__contact-adress">{{{standortadresse}}}</div>{{#if telefonnummer}}<div><span class="search__contact-label">{{phone-direct}}</span><a class="search__contact-link" href="tel:{{telefonnummer}}">{{telefonnummer}}</a></div>{{/if}}{{#if telefonnummer_central}}<div><span class="search__contact-label">{{phone-central}}</span><a class="search__contact-link" href="tel:{{telefonnummer_central}}">{{telefonnummer_central}}</a></div>{{/if}}{{#if email}}<div><span class="search__contact-label">{{email-label}}</span><a class="search__contact-link" href="mailto:{{email}}">{{email}}</a></div>{{/if}}</td></tr>',
				events: '<div class="cat_page_result search__result--item" class="widg_teaser">{{#if img}}<div class="widg_teaser__img"><img src="{{img.src}}" alt=""/></div>{{/if}}{{#if date}} <span class="widg_teaser__date">{{date}}</span>{{/if}} <span class="widg_teaser__title">{{{Title}}}</span>{{#if descriptionText}} <p>{{dotdotdot_teaser descriptionText}}</p>{{/if}} <a class="widg_teaser__link" href="{{url}}">{{title}}</a> <span class="widg_teaser__arrow"></span></div>',
				studies: '<tr class="cat_page_result search__result--item" data-clickable="true" ><td class="search__cell search__cell-title"><a href="{{combinedURL}}" class="search__cell-anchor">{{Title}}</a></td><td>{{#get_taxonomy_eduproducttype}}{{taxonomy_eduproducttype}}{{/get_taxonomy_eduproducttype}}</td><td>{{#get_taxonomy_subjectarea}}{{taxonomy_subjectarea}}{{/get_taxonomy_subjectarea}}</td><td>{{#get_city}}{{city}}{{/get_city}}</td><td data-searchpage="url"><a href="{{combinedURL}}"></a><span class="search__result-arrow"></span></td></tr>',
			},
			showAll: '<li class="search__result-normal search__result-show-all"><a href="{{categoryUrl}}">{{categoryUrlText}}</a></li>'
		},
		searchCategories = [
			'studies',
			'training',
			'events',
			'profiles',
			'organisation',
			'documents',
			'irf',
			'web',
			'sonst'
		],
		activeCategorySearch = false,
		localeKeyMapping = {
			ä: 'a',
			ö: 'o',
			ü: 'u',
			é: 'e',
			è: 'e',
			à: 'a'
		},
		langStrings = {},

		// keeps track of requests not completed yet
		outstandingRequests = [];

	/**
	 * Normalizing the car for word list if Umlaut
	 * @param char
	 * @returns {*}
	 */
	function normalizeChar(char) {
		if (localeKeyMapping.hasOwnProperty(char.toLowerCase())) {
			char = localeKeyMapping[char.toLowerCase()].toUpperCase();
		}

		return char;
	}

	function generateSearchListItem(listEntry, category) {
		var template = null;
		listEntry.combinedURL = listEntry['@id'];

		switch (category) {
			case 'event':
				template = Handlebars.compile(listEntryTemplates.searchbar.event);
				break;
			case 'doc':
				template = Handlebars.compile(listEntryTemplates.searchbar.doc);
				break;
			default:
				template = Handlebars.compile(listEntryTemplates.searchbar.normal);
				break;
		}
		return template(listEntry);
	}

	/**
	 * Generates the result table for the category search
	 * @param data
   */
	function generateResultTable(data) {
		var results = data.items,
				$responseHTML = $('<table></table>'),
				$headersRow = $('<tr></tr>'),
				template = null;

		if (data.category in listHeadTemplates.categorySearch) {
			template = Handlebars.compile(listHeadTemplates.categorySearch[data.category]);
			$('<thead></thead>').appendTo($responseHTML).append(template(_.assign(data.fieldHeaders, langStrings)));
		}

		results.forEach(function(row) {
			template = Handlebars.compile(listEntryTemplates.categorySearch[data.category]);

			row.combinedURL = row['@id'];

			if (typeof row.standortadresse !== typeof undefined) {
				row.standortadresse = row.standortadresse.replace(/(?:\r\n|\r|\n)/g, '<br />');
			}

			$responseHTML.append(template(_.assign(row, langStrings)));
		});

		return $responseHTML;
	}

	/**
	 * Generates the Word List
	 * @param data
	 * @returns {*|HTMLElement}
	 */
	function generateWordList(data) {
		var results = data.items,
				$responseHTML = $('<div class="search__word-list"></div>'),
				template = null,
				activeLetter = null,
				$letterBox = null;

		results.forEach(function(wordItem) {
			var firstLetterItem = normalizeChar(wordItem.title.charAt(0));
			wordItem.combinedURL = wordItem['@id'];
			if (activeLetter !== firstLetterItem) {
				activeLetter = firstLetterItem;
				if ($letterBox) {
					$letterBox.append('</div>');
					$responseHTML.append($letterBox);
				}
				$letterBox = $('<div id="searchpage-char-' + firstLetterItem + '"><h2>' + firstLetterItem + '</h2></div>');
			}

			template = Handlebars.compile(listEntryTemplates.categorySearch[data.category]);
			$letterBox.append(template(wordItem));
		});

		$responseHTML.append($letterBox);
		return $responseHTML;
	}

	/**
	 * Generates the Events teasers
	 */
	function generateTeasers(data) {
		var results = data.items,
				$responseHTML = $('<div class="widg_teaser__wrapper"></div>'),
				template = null;

		results.forEach(function(teaserItem) {
			teaserItem.combinedURL = teaserItem['@id'];
			template = Handlebars.compile(listEntryTemplates.categorySearch[data.category]);
			$responseHTML.append(template(teaserItem));
		});
		return $responseHTML;
	}

	function getAllLangStrings() {
		var $searchpage = $('.widg_searchpage');

		if ($searchpage.length > 0) {
			var d = {},
					re_dataAttr = /^data-lang-(.+)$/;

			$.each($searchpage.get(0).attributes, function(index, attr) {
				if (re_dataAttr.test(attr.nodeName)) {
					var key = attr.nodeName.match(re_dataAttr)[1];

					d[key] = attr.nodeValue;
				}
			});

			langStrings = d;
		}
	}

	function generateListItems(data) {
		var $searchCategory = $('<div class="search__cat"></div>'),
			$categoryList = $('<ul></ul>');

		data.items.forEach(function(listEntry) {
			var $tempListDOM = generateSearchListItem(listEntry, data.category);
			$categoryList.append($tempListDOM);
		});
		$searchCategory.append($categoryList);
		return $searchCategory;
	}

	/**
	 * Handles the returned data and puts it in the html Templates
	 * @param data
   */
	function handleReturnData(data) {
		if (typeof data.items !== typeof undefined) {
			var responseData = data.items,
				$searchCategory = null,
				$categoryList = null,
				$categoryTitle = null,
				$tempListDOM = null,
				$responseHTML = $('<div></div>');

			getAllLangStrings();

			if (data.items.length > 0) {
				if (activeCategorySearch) {
					if (data.category === 'expertises') {
						$responseHTML.append(generateWordList(data));
					} else if (data.category === 'events') {
						$responseHTML.append(generateTeasers(data));
					} else if (RENDER_AS_LIST_ITEMS.indexOf(data.category) >= 0) {
						$responseHTML = generateListItems(data);
					} else {
						$responseHTML.addClass('search__table').append(generateResultTable(data));
					}
				} else {
					$searchCategory = $('<div class="search__cat"></div>');
					$categoryList = $('<ul></ul>');
					$categoryTitle = $('<span class="search__cat-title">' + data.categoryTitle + '</span>');

					responseData.forEach(function(listEntry) {
						if (listEntry.UID && (listEntry.UID in data.highlighting)) {
							var data_highlighting = data.highlighting[listEntry.UID];
							if (data_highlighting.Title) {
								listEntry.Title = data_highlighting.Title[0];
							}
						}
						$tempListDOM = generateSearchListItem(listEntry, data.category);
						$categoryList.append($tempListDOM);
					});

					if (data.categoryUrl || data.categoryUrl !== '') {
						if (data.items_total > 5) {
							data.categoryUrl += '&offset=45';
							var template = Handlebars.compile(listEntryTemplates.showAll);

							// show show-all button only if there are more than 5 results
							$categoryList.append(template(data));
						}
					}

					$searchCategory.append($categoryTitle).append($categoryList);
					$responseHTML = $searchCategory;
				}
			}

			$(window).trigger(events.dataLoaded, [$responseHTML, data.items_total, responseData.length, data.category, data.facets]);
		} else {
			$(window).trigger(events.dataLoaded, [false]);
		}
	}

	function isEmpty(v) {
		return v === undefined || v === '' || v === null || (_.isArray(v) && _.isEmpty(v));
	}

	function encodeSearchParameters(queryParams, ignoreKeys) {
		if (ignoreKeys === undefined) {
			ignoreKeys = [];
		}
		var params = _.pickBy(queryParams, function(v, k) {
			return !isEmpty(v) && ignoreKeys.indexOf(k) < 0;
		});

		return $.param(params);
	}

	/**
	 * Sets search parameters to the url while updating url. The
	 * keys listed in ignoreKeys will be ignored in the url.
	 *
	 * @param {Object} queryParams Query parameters
	 */
	function setSearchParameters(queryParams) {
		// update url
		var ignoreKeys = [
			'template',
			'category'
		];
		window.history.replaceState({}, '', '#' + encodeSearchParameters(queryParams, ignoreKeys));
	}

	/**
	 * Marks outstanding request as completed - removes it from the list
	 * @param xhr {XMLHTTPRequest} request object
	 */
	function requestCompleted(xhr) {
		outstandingRequests = outstandingRequests.filter(function(_xhr) {
			return _xhr !== xhr;
		});
	}

	/**
	 * Cancells all outstanding requests and removes the from the list
	 */
	function cancelOutstandingRequests() {
		outstandingRequests.forEach(function(xhr) {
			xhr.abort();
		});
		outstandingRequests = [];
	}

	/**
	 * Execs the search
	 * @param query the single word search query
	 * @param isSearchbar if the search is triggered in the searchbar (different ajax target)
	 * @param isCategorySearch if the search should be a category search (different ajax target and different templates)
	 * @param searchTemplate the template for the search results (how to display)
	 * @param searchURL the search url
   */
	function search(query, isSearchbar, isCategorySearch, searchTemplate, searchURL, preventHashUpdate) {
		var isPageSearch = false;

		if (typeof isSearchbar === typeof undefined) {
			isSearchbar = false;
		}

		if (typeof isCategorySearch === typeof undefined) {
			isCategorySearch = false;
		}

		if (!isSearchbar && !isCategorySearch) {
			isPageSearch = true;
		}

		activeCategorySearch = isCategorySearch;
		cancelOutstandingRequests();

		if (isSearchbar || isPageSearch) {
			searchCategories.forEach(function(category) {
				var xhr = $.ajax({
					data: _.assign(query, {
						category: category,
						template: searchTemplate
					}),
					dataType: 'json',
					success: handleReturnData,
					error: handleReturnData,
					complete: requestCompleted,
					url: searchURL
				});

				outstandingRequests.push(xhr);
			});
		} else if (isCategorySearch) {
			var xhr = $.ajax({
				data: query,
				dataType: 'json',
				success: handleReturnData,
				error: handleReturnData,
				complete: requestCompleted,
				url: searchURL
			});
			outstandingRequests.push(xhr);
		}

		if (!preventHashUpdate) {
			setSearchParameters(query);
		}
	}

	/**
	 * Handles the update filter data (basically just triggers a new event)
	 */
	function handleUpdateFilterData(data) {
		$(window).trigger(events.updateFilterLoaded, data);
	}

	/**
	 * Sending the ajax request for update the filter
 	 * @param query
	 */
	function updateFilter(query, filterURL) {
		if (query) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleUpdateFilterData,
				url: filterURL
			});
		} else {
			console.error('no update filter query defined'); // eslint-disable-line no-console
		}
	}

	/**
	 * Gets the searchparameters from the windows bar and sends back an assoc array
	 * @returns {{}}
   */
	function getSearchParameters() {
		return $.deparam(window.location.hash.substr(1)) || {};
	}

	/**
	 * Updates specific search parameters value by key. Writes to URL.
	 *
	 * @param {string} key Search parameter key
	 * @param {*} value Parameter's value
	 */
	function updateSearchParameter(key, value) {
		var searchParams = getSearchParameters();
		searchParams[key] = value;
		setSearchParameters(searchParams);
	}

	// init fieldDictionaries with the DOM option elements
	for (var field in fieldDictionaries) {
		if ($('#' + field).length === 0) {
			continue;
		}

		$('#' + field + ' > option').each(function() { // eslint-disable-line no-loop-func
			fieldDictionaries[field][this.value] = {
				text: this.text,
				hide: false
			};
		});
		$('.' + field + '_hidden_option').each(function() { // eslint-disable-line no-loop-func
			fieldDictionaries[field][$(this).data('value')] = {
				text: $(this).data('text'),
				hide: true
			};
		});
	}

	// Save to global namespace
	$.extend(true, estatico, {
		search: {
			search: search,
			getSearchParameters: getSearchParameters,
			setSearchParameters: setSearchParameters,
			updateSearchParameter: updateSearchParameter,
			encodeSearchParameters: encodeSearchParameters,
			updateFilter: updateFilter,
			handleReturnData: handleReturnData,
			RENDER_AS_LIST_ITEMS: RENDER_AS_LIST_ITEMS
		}
	});
})(jQuery);


/*
 * Handlebar helpers
 */

// dotdotdot
Handlebars.registerHelper('dotdotdot_teaser', function(str) {
	'use strict';

	if (str.length > 160) {
		return str.substring(0, 160) + '...';
	}

	return str;
});

// fieldDictionaries
for (var field in fieldDictionaries) { // eslint-disable-line guard-for-in
	(function(local__field) {

		/**
		 * @return
		 *   Comma-separated list of the record's field's non-hidden values if it is not empty.
		 *   Comma-separated list of the record's field hidden values otherwise.
		 */
		Handlebars.registerHelper('get_' + local__field, function(options) {
			'use strict';

			var nonHiddenItems = options.fn(this)
					.split(',')
					.map(function(item) {
						return ((item in fieldDictionaries[local__field]) && !fieldDictionaries[local__field][item].hide) ? fieldDictionaries[local__field][item].text : null;
					})
					.filter(function(value) {
						return value !== null;
					})
					.join(', ');

			if (nonHiddenItems !== '') {
				return nonHiddenItems;
			}

			var hiddenItems = options.fn(this)
					.split(',')
					.map(function(item) {
						return ((item in fieldDictionaries[local__field]) && fieldDictionaries[local__field][item].hide) ? fieldDictionaries[local__field][item].text : null;
					})
					.filter(function(value) {
						return value !== null;
					})
					.join(', ');

			return hiddenItems;
		});
	})(field);
}
