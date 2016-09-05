/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var searchbarURL = '/mocks/widgets/searchbar/searchbar.json',
			searchpageURL = '/mocks/widgets/searchpage/searchpage.json',
			searchpageCategoryURL = '/mocks/widgets/searchpage/searchpage.category.json',
			updateFilterURL = '/mocks/widgets/searchpage/searchpage.updateFilter.json',
			events = {
				dataLoaded: 'dataLoaded.estatico.search',
				updateFilterLoaded: 'updateFilterLoaded.estatico.search'
			},

			listEntryTemplates = {
				searchbar: {
					normal: '<li class="search__result-normal"><a href="{{url}}"><span class="title">{{Title}}</span></a></li>',
					event: '<li class="search__result-event"><a href="{{url}}"><span class="title">{{Title}}</span><span class="event-info">{{eventDetail}}</span></a></li>',
					doc: '<li class="search__result-doc"><a href="{{url}}"><span class="title">{{Title}}<span class="visible-in-bar">({{fileType}})</span></span><span class="file-type visible-in-page">{{fileType}}</span></a></li>'
				},
				searchpage: {
					normal: '<li class="search__result-normal"><a href="{{url}}"><span class="title">{{Title}}</span></a></li>',
					training: '<li class="search__result-normal"><a href="{{url}}"><span class="title">{{Title}}</span><span class="study_type">{{study_type}}</span></a></li>'
				},
				categorySearch: {
					training: '<tr><td>{{Title}}</td><td>{{type}}</td><td>{{faculty}}</td><td>{{location}}</td><td data-searchpage="url"><a href="{{url}}"></a></td></tr>'
				},
				showAll: '<li class="search__result-normal search__result-show-all"><a href="{{categoryUrl}}">{{categoryUrlText}}</a></li>'
			},
			searchCategories = [
					'training',
					'studies',
					'events',
					'organisation',
					'documents',
					'irf',
					'web'
			],
			activeCategorySearch = false,
			searchTemplate = 'livesearch';

	function generateSearchListItem(listEntry, category) {
		var template = null;

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
					template = Handlebars.compile(listEntryTemplates.searchbar.event);
					break;
				case 'doc':
					template = Handlebars.compile(listEntryTemplates.searchbar.doc);
					break;
				case 'training':
					template = Handlebars.compile(listEntryTemplates.searchpage.training);
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

		headers.forEach(function(header) {
			if (header === 'URL') {
				$headersRow.append('<th class="url">' + header + '</th>');
			} else {
				$headersRow.append('<th>' + header + '</th>');
			}
		});

		$responseHTML.append($headersRow);

		results.forEach(function(row) {
			template = Handlebars.compile(listEntryTemplates.categorySearch[data.responseHeader.params.category]);

			$responseHTML.append(template(row));
		});

		return $responseHTML;
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

		if (activeCategorySearch) {
			$responseHTML.addClass('search__table').append(generateResultTable(data));
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

		$(window).trigger(events.dataLoaded, [$responseHTML, data.response.numFound, responseData.length]);
	}

	/**
	 * Execs the search
	 * @param query the single word search query
	 * @param isSearchbar if the search is triggered in the searchbar (different ajax target)
	 * @param isCategorySearch if the search should be a category search (different ajax target and different templates)
   */
	function search(query, isSearchbar, isCategorySearch) {
		var isPageSearch = false,
				targetUrl = searchpageURL;

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

		activeCategorySearch = isCategorySearch;

		if (isSearchbar || isPageSearch) {
			if (isSearchbar) {
				targetUrl = searchbarURL;
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
					url: targetUrl
				});
			});
		} else if (isCategorySearch) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleReturnData,
				url: searchpageCategoryURL
			});
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
	function updateFilter(query) {
		if (query) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleUpdateFilterData,
				url: updateFilterURL
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

		return searchprmtrs !== null && searchprmtrs !== '' ? transformToAssocArray(searchprmtrs) : {};
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
