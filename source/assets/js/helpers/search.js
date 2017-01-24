/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var events = {
				dataLoaded: 'dataLoaded.estatico.search',
				updateFilterLoaded: 'updateFilterLoaded.estatico.search'
			},

			listEntryTemplates = {
				searchbar: {
					normal: '<li class="search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span></a><span class="search__result-arrow"></span></li>',
					event: '<li class="search_result search__result-event"><a href="{{combinedURL}}"><span class="title">{{Title}}</span><span class="event-info">{{start}}</span></a><span class="search__result-arrow"></span></li>',
					doc: '<li class="search_result search__result-doc"><a href="{{combinedURL}}"><span class="title">{{Title}}<span class="visible-in-bar">({{mimeType}})</span></span><span class="file-type visible-in-page">{{mimeType}}</span></a></li>',
					webservices: '<li class="search_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span></a><span class="search__result-arrow"></span></li>',
					irf: '<li class="search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span></a><span class="search__result-arrow"></span></li>'
				},
				searchpage: {
					normal: '<li class="cat_page_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span> </a><span class="search__result-arrow"></span></li>',
					training: '<li class="cat_page_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span><span class="study_type">{{edu_type}}</span></a><span class="search__result-arrow"></span></li>',
					event: '<li class="cat_page_result search__result-event"><a href="{{combinedURL}}"><span class="title">{{Title}}</span><span class="event-info">{{portal_type}}, {{start}}</span></a><span class="search__result-arrow"></span></li>',
					sonst: '<li class="cat_page_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span><span class="description">{{description}}</span><span class="url">{{url}}</span></a><span class="search__result-arrow"></span></li>',
					webservices: '<li class="cat_page_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span></a><span class="search__result-arrow"></span></li>',
					irf: '<li class="cat_page_result search__result-normal"><a href="{{combinedURL}}"><span class="title">{{Title}}</span></a><span class="search__result-arrow"></span></li>'
				},
				categorySearch: {
					training: '<tr class="cat_page_result" data-clickable="true" ><td>{{Title}}</td><td>{{type}}</td><td>{{fields}}</td><td>{{fhnw_location}}</td><td data-searchpage="url"><a href="{{combinedURL}}"></a><span class="search__result-arrow"></span></td></tr>',
					expertises: '<div class="cat_page_result" data-clickable="true" class="search__result-word-list"><a href="{{combinedURL}}">{{Title}}<span class="search__result-arrow"></span></a></div>',
					profiles: '<tr class="cat_page_result" data-clickable="false"><td><div><h4>{{Title}}</h4></div><div>{{description}}</div><a class="button__secondary" href="{{combinedURL}}">{{to-profile}}</a></td><td><div class="search__contact-adress">{{{standortadresse}}}</div>{{#if phone}}<div><span class="search__contact-label">{{phone-direct}}</span><a class="search__contact-link" href="tel:{{phone}}">{{phone}}</a></div>{{/if}}{{#if central_phone}}<div><span class="search__contact-label">{{phone-central}}</span><a class="search__contact-link" href="tel:{{central_phone}}">{{central_phone}}</a></div>{{/if}}{{#if email}}<div><span class="search__contact-label">{{email-label}}</span><a class="search__contact-link" href="tel:{{email}}">{{email}}</a></div>{{/if}}</td></tr>',
					events: '<div class="cat_page_result" class="widg_teaser">{{#if img}} <div class="widg_teaser__img"><img src="{{img.src}}"/></div>{{/if}}{{#if date}} <span class="widg_teaser__date">{{date}}</span>{{/if}} <h4>{{{Title}}}</h4>{{#if descriptionText}} <p>{{dotdotdot_teaser descriptionText}}</p>{{/if}} <a class="widg_teaser__link" href="{{url}}">{{title}}</a> <span class="widg_teaser__arrow"></span></div>'
				},
				showAll: '<li class="search__result-normal search__result-show-all"><a href="{{categoryUrl}}">{{categoryUrlText}}</a></li>'
			},
			searchCategories = [
					'training',
					'studies',
					'events',
					'profiles',
					'organisation',
					'documents',
					'irf',
					'web',
					'sonst'
			],
			activeCategorySearch = false,
			searchTemplate = 'livesearch',
			localeKeyMapping = {
				ä: 'a',
				ö: 'o',
				ü: 'u',
				é: 'e',
				è: 'e',
				à: 'a'
			},
			langStrings = {},
			currentBaseURL = null;

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

		if (typeof listEntry.url === typeof undefined) {
			listEntry.combinedURL = currentBaseURL + listEntry.path_string;
		} else {
			listEntry.combinedURL = listEntry.url;
		}

		if (searchTemplate === 'livesearch') {
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
		} else {
			switch (category) {
				case 'event':
					template = Handlebars.compile(listEntryTemplates.searchpage.event);
					break;
				case 'doc':
					template = Handlebars.compile(listEntryTemplates.searchpage.doc);
					break;
				case 'training':
					template = Handlebars.compile(listEntryTemplates.searchpage.training);
					break;
				case 'webservice':
					template = Handlebars.compile(listEntryTemplates.searchpage.webservices);
					break;
				default:
					template = Handlebars.compile(listEntryTemplates.searchpage.normal);
					break;
			}
		}

		return template(listEntry);
	}

	/**
	 * Generates the result table for the category search
	 * @param data
   */
	function generateResultTable(data) {
		var results = data.response.docs,
				headers = data.response.tableHeaders,
				$responseHTML = $('<table></table>'),
				$headersRow = $('<tr></tr>'),
				template = null;

		if (typeof headers !== typeof undefined) {
			headers.forEach(function(header) {
				if (header === 'URL') {
					$headersRow.append('<th class="url">' + header + '</th>');
				} else {
					$headersRow.append('<th>' + header + '</th>');
				}
			});
		}

		$responseHTML.append($headersRow);

		results.forEach(function(row) {
			template = Handlebars.compile(listEntryTemplates.categorySearch[data.responseHeader.params.category]);

			if (typeof row.url === typeof undefined) {
				row.combinedURL = currentBaseURL + row.path_string;
			} else {
				row.combinedURL = row.url;
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
		var results = data.response.docs,
				$responseHTML = $('<div class="search__word-list"></div>'),
				template = null,
				activeLetter = null,
				$letterBox = null;

		results.forEach(function(wordItem) {
			var firstLetterItem = normalizeChar(wordItem.Title.charAt(0));

			if (typeof wordItem.url === typeof undefined) {
				wordItem.combinedURL = wordItem.base_url + wordItem.path_string;
			} else {
				wordItem.combinedURL = wordItem.url;
			}

			if (activeLetter !== firstLetterItem) {
				activeLetter = firstLetterItem;

				if ($letterBox) {
					$letterBox.append('</div>');

					$responseHTML.append($letterBox);
				}

				$letterBox = $('<div id="searchpage-char-' + firstLetterItem + '"><h2>' + firstLetterItem + '</h2></div>');
			}

			template = Handlebars.compile(listEntryTemplates.categorySearch[data.responseHeader.params.category]);

			$letterBox.append(template(wordItem));
		});

		$responseHTML.append($letterBox);

		return $responseHTML;
	}

	/**
	 * Generates the Events teasers
	 */
	function generateTeasers(data) {
		var results = data.response.docs,
				$responseHTML = $('<div class="widg_teaser__wrapper"></div>'),
				template = null;

		results.forEach(function(teaserItem) {
			template = Handlebars.compile(listEntryTemplates.categorySearch[data.responseHeader.params.category]);

			$responseHTML.append(template(teaserItem));
		});

		return $responseHTML;
	}

	function getAllLangStrings() {
		var $searchpage = $('.widg_searchpage');

		if ($searchpage.length > 0) {
			var d = {},
					re_dataAttr = /^data-lang\-(.+)$/;

			$.each($searchpage.get(0).attributes, function(index, attr) {
				if (re_dataAttr.test(attr.nodeName)) {
					var key = attr.nodeName.match(re_dataAttr)[1];

					d[key] = attr.nodeValue;
				}
			});

			langStrings = d;
		}
	}

	/**
	 * Handles the returned data and puts it in the html Templates
	 * @param data
   */
	function handleReturnData(data) {
		var responseData = data.response.docs,
				$searchCategory = null,
				$categoryList = null,
				$categoryTitle = null,
				$tempListDOM = null,
				$responseHTML = $('<div></div>');

		getAllLangStrings();

		if (data.response.docs.length > 0) {
			if (typeof data.response.base_url !== typeof undefined) {
				currentBaseURL = data.response.base_url;
			}

			if (activeCategorySearch) {
				if (data.responseHeader.params.category === 'expertises') {
					$responseHTML.append(generateWordList(data));
				} else if (data.responseHeader.params.category === 'events') {
					$responseHTML.append(generateTeasers(data));
				} else {
					$responseHTML.addClass('search__table').append(generateResultTable(data));
				}
			} else {
				$searchCategory = $('<div class="search__cat"></div>');
				$categoryList = $('<ul></ul>');
				$categoryTitle = $('<span class="search__cat-title">' + data.response.categoryTitle + '</span>');

				responseData.forEach(function(listEntry) {
					$tempListDOM = generateSearchListItem(listEntry, data.responseHeader.params.category);

					$categoryList.append($tempListDOM);
				});

				if (data.response.categoryUrl) {
					var template = Handlebars.compile(listEntryTemplates.showAll);

					$categoryList.append(template(data.response));
				}

				$searchCategory.append($categoryTitle).append($categoryList);

				$responseHTML = $searchCategory;
			}
		}

		$(window).trigger(events.dataLoaded, [$responseHTML, data.items_total, responseData.length, data.category, data.facets]);
	}

	function saveToLocalStorage(query) {
		localStorage.setItem('fhnw_search_query', JSON.stringify(query));
	}

	/**
	 * Execs the search
	 * @param query the single word search query
	 * @param isSearchbar if the search is triggered in the searchbar (different ajax target)
	 * @param isCategorySearch if the search should be a category search (different ajax target and different templates)
	 * @param searchTemplate the template for the search results (how to display)
	 * @param searchURL the search url
   */
	function search(query, isSearchbar, isCategorySearch, searchTemplate, searchURL) {
		var isPageSearch = false;

		if (typeof isSearchbar === typeof undefined) {
			isSearchbar = false;
		}

		if (typeof isCategorySearch === typeof undefined) {
			isCategorySearch = false;
		}

		if (!isSearchbar && !isCategorySearch) {
			isPageSearch = true;
			searchTemplate = 'search_full';
		}

		if (typeof searchTemplate === typeof undefined) {
			searchTemplate = 'search_full';
		}

		activeCategorySearch = isCategorySearch;

		if (isSearchbar || isPageSearch) {
			if (isSearchbar) {
				searchTemplate = 'livesearch';
			}

			searchCategories.forEach(function(category) {
				$.ajax({
					data: _.assign(query, {
						category: category,
						template: searchTemplate
					}),
					dataType: 'json',
					success: handleReturnData,
					url: searchURL
				});
			});
		} else if (isCategorySearch) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleReturnData,
				url: searchURL
			});
		}

		if (typeof localStorage !== typeof undefined) {
			saveToLocalStorage(query);
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
			console.error('no update filter query defined');
		}
	}

	/**
	 * Transforms the search parameters from the url to an associative array
	 * @param searchprmtrs
	 * @returns {{}}
   */
	function transformToAssocArray(searchprmtrs) {
		var params = {},
				pmarr = searchprmtrs.split('&');

		for (var i = 0; i < pmarr.length; i++) {
			var tmparr = pmarr[i].split('=');

			params[tmparr[0]] = tmparr[1];
		}

		return params;
	}

	/**
	 * Gets the searchparameters from the windows bar and sends back an assoc array
	 * @returns {{}}
   */
	function getSearchParameters() {
		var searchprmtrs = window.location.search.substr(1);

		if (searchprmtrs === null || searchprmtrs === '') {
			searchprmtrs = localStorage.getItem('fhnw_search_query');

			if (searchprmtrs !== null) {
				searchprmtrs = $.parseJSON(searchprmtrs);
			}
		} else {
			searchprmtrs = transformToAssocArray(searchprmtrs);
		}

		return searchprmtrs !== null && searchprmtrs !== '' ? searchprmtrs : {};
	}

	// Save to global namespace
	$.extend(true, estatico, {
		search: {
			search: search,
			getSearchParameters: getSearchParameters,
			updateFilter: updateFilter,
			handleReturnData: handleReturnData
		}
	});
})(jQuery);

Handlebars.registerHelper('dotdotdot_teaser', function(str) {
	'use strict';

	if (str.length > 160) {
		return str.substring(0, 160) + '...';
	}

	return str;
});
